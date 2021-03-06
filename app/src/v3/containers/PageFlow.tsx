/*
 * @Author: Kanata You 
 * @Date: 2020-09-24 14:06:26 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-16 20:58:48
 */

import React, { Component } from "react";
import { SubscribeWheelEvent, IsWheelEventValid, UnsubscribeWheelEvent } from "../tools/WheelEventManager";
import { TextNodeV3 } from "../cards/Card";
import { TextV3 } from "../TypesV3";
import { Fonts } from "../design/design";
import { connect } from "react-redux";
import { LangConfig } from "../reducers/LangConfig";
import { createAnimation, createStyle, connectStyle } from "reacss";


const twinkle = createAnimation("twinkle", {
    '0%': {
        opacity: 0.4
    },
    '100%': {
        opacity: 1
    }
});

const upExit = createAnimation("up-exit", {
    '0%': {
        opacity:    1
    },
    '100%': {
        transform:  'translateY(-200px)',
        opacity:    0.4
    }
});
const upEnter = createAnimation("up-enter", {
    '0%': {
        transform:  'translateY(200px)',
        opacity:    0.4
    },
    '100%': {
        transform:  undefined,
        opacity:    undefined
    }
});
const downExit = createAnimation("down-exit", {
    '0%': {
        opacity:    1
    },
    '100%': {
        transform:  'translateY(200px)',
        opacity:    0.4
    }
});
const downEnter = createAnimation("down-enter", {
    '0%': {
        transform:  'translateY(-200px)',
        opacity:    0.4
    },
    '100%': {
        transform:  undefined,
        opacity:    undefined
    }
});

const PageFlowStyle = createStyle({
    "div": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    "div > div:first-child": {
        flex:           1,
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        overflow:       "hidden",
        margin:         0
    },
    "div > div:first-child > .up-exit": {
        animation:      upExit({ duration: '160ms', timingFunction: 'ease-in' })
    },
    "div > div:first-child > .up-enter": {
        animation:      upEnter({ duration: '160ms', timingFunction: 'ease-out' })
    },
    "div > div:first-child > .down-exit": {
        animation:      downExit({ duration: '160ms', timingFunction: 'ease-in' })
    },
    "div > div:first-child > .down-enter": {
        animation:      downEnter({ duration: '160ms', timingFunction: 'ease-out' })
    },
    "div > div.navi": {
        width:          "20px",
        height:         "40%",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        margin:         "0 calc(0.6vw + 6px) 0 calc(-0.6vw - 26px)",
        pointerEvents:  "none"
    },
    "div > div.navi > div": {
        display:        "block",
        width:          "6px",
        height:         "6px",
        margin:         "6px 4px",
        border:         "1px solid rgb(255,255,255)",
        borderRadius:   "3px",
        pointerEvents:  "all",
        cursor:         "pointer"
    },
    "* .tip": {
        padding:        '0 0.25em',
        pointerEvents:  'none',
        border:         '1px solid rgb(204,179,143)',
        background:     'white',
        color:          'rgb(255,127,127)',
        fontWeight:     600,
        fontSize:       '120%',
        borderRadius:   '0.4em',
        
        animation: twinkle({
            duration:       '1.6s',
            iterationCount: 'infinite',
            direction:      'alternate'
        }),

        position:   "relative",
        width:      "1em",
        display:    "flex",
        alignItems: "center",
        marginLeft: "calc(-1.5em - 2px)",
        right:      "48px",
        writingMode:"vertical-lr",
    }
})

export interface PageFlowProps {
    height: string | number;
    children?: Array<JSX.Element>;
    style?: React.CSSProperties;
    showTip?: boolean;
};

export interface PageFlowState {
    idx: number;
};

// @ts-ignore
@connect(LangConfig.mapStateToProps)
export class PageFlow extends Component<PageFlowProps, PageFlowState> {

    protected wheelEvent: (this: HTMLElement, ev: WheelEvent) => any;
    protected keyDownEvent: (this: HTMLElement, ev: KeyboardEvent) => any;

    protected container: React.RefObject<HTMLDivElement>;

    protected cdHolder: boolean;
    protected aniDirection: "up" | "down";
    protected timers: Array<NodeJS.Timeout>;

    protected touched: boolean;
    protected originY: number;

    protected showTip: boolean;

    public constructor(props: PageFlowProps) {
        super(props);
        this.state = {
            idx: 0
        };

        this.wheelEvent = (e: WheelEvent) => {
            if (this.container.current) {
                if (!this.container.current.firstElementChild!.firstElementChild) {
                    return;
                }

                if (this.cdHolder) {
                    e.preventDefault();
                    SubscribeWheelEvent(e);
                    return;
                }

                if (navigator.userAgent.toLocaleLowerCase().includes("firefox")) {
                    // 火狐浏览器
                    if (this.props.children?.length === 1) {
                        // 跳过
                    } else if (this.state.idx === 0 && e.deltaY < 0) {
                        // 第一个，向上
                    } else if (this.state.idx + 1 === this.props.children?.length && e.deltaY > 0) {
                        // 最后一个，向下
                    } else if (e.deltaY < 0) {
                        // 上一页
                        e.preventDefault();
                        this.prevPage();
                    } else if (e.deltaY > 0) {
                        // 下一页
                        e.preventDefault();
                        this.nextPage();
                    }
                    return;
                }

                if (!IsWheelEventValid(e)) {
                    // 登录 wheel 事件，排除其中连续触发的部分
                    return;
                }
                
                if (this.props.children?.length === 1) {
                    // 跳过
                    return;
                } else if (this.state.idx === 0 && e.deltaY < 0) {
                    // 第一个，向上
                    return;
                } else if (this.state.idx + 1 === this.props.children?.length && e.deltaY > 0) {
                    // 最后一个，向下
                    return;
                } else if (e.deltaY < 0) {
                    // 上一页
                    e.preventDefault();
                    this.prevPage();
                    return;
                } else if (e.deltaY > 0) {
                    // 下一页
                    e.preventDefault();
                    this.nextPage();
                    return;
                }
            }
        };
        
        this.keyDownEvent = ev => {
            if (!this.cdHolder && props.children && props.children.length > 1) {
                if (ev.key === "ArrowDown" && this.state.idx < props.children.length - 1) {
                    this.nextPage();
                    ev.stopPropagation();
                } else if (ev.key === "ArrowUp" && this.state.idx > 0) {
                    this.prevPage();
                    ev.stopPropagation();
                }
            }
        };

        this.container = React.createRef<HTMLDivElement>();

        this.cdHolder = false;
        this.aniDirection = "down";
        this.timers = [];

        this.touched = false;
        this.originY = 0;

        this.showTip = this.props.showTip ?? false;
    }

    @connectStyle(PageFlowStyle)
    public render(): JSX.Element {
        return (
            <div ref={ this.container }
            style={{
                padding: this.props.style?.margin
            }}
            onTouchStart={
                e => {
                    if (e.touches.length === 1) {
                        this.touched = true;
                        this.originY = e.touches[0].screenY;
                    }
                }
            }
            onTouchMove={
                e => {
                    if (this.props.children && this.touched && e.touches.length === 1) {
                        const y = e.touches[0].screenY - this.originY;
                        if (Math.abs(y) >= window.innerHeight / 10) {
                            if (y > 0) {
                                if (this.state.idx) {
                                    this.prevPage();
                                    this.originY = e.touches[0].screenY;
                                }
                            } else {
                                if (this.state.idx + 1 < this.props.children.length) {
                                    this.nextPage();
                                    this.originY = e.touches[0].screenY;
                                }
                            }
                        }
                    }
                }
            }
            onTouchEnd={
                () => {
                    this.touched = false;
                }
            } >
                <div key="box"
                style={{
                    height: this.props.height,
                    ...this.props.style
                }} >
                {
                    this.props.children?.length ? this.props.children[this.state.idx] : null
                }
                </div>
                {
                    this.props.children?.length || 0 > 1 ? (
                        <div key="navi" className="navi" >
                        {
                            this.props.children!.map((_, i) => {
                                return (
                                    <div key={ i } tabIndex={ 1 }
                                    style={{
                                        background: `rgba(255,255,255,${
                                            i === this.state.idx ? 1 : 0.2
                                        })`
                                    }}
                                    onClick={
                                        () => {
                                            if (i !== this.state.idx) {
                                                this.aniDirection = (
                                                    i < this.state.idx
                                                ) ? "down" : "up";
                                                return this.shiftTo(i);
                                            }
                                        }
                                    } />
                                );
                            })
                        }
                        </div>
                    ) : null
                }
                {
                    this.showTip ? (
                        <div key="tip" className="tip"
                        style={{
                            // @ts-ignore
                            fontFamily: Fonts[this.props.lang] || "inherit"
                        }} >
                            <label>
                                <pre>
                                    <TextNodeV3>
                                        {
                                            new TextV3(
                                                " 向下滑动屏幕查看更多 → ",
                                                "下へスクロールすると次の内容が表示する  →",
                                                "scroll down to view more  →"
                                            )
                                        }
                                    </TextNodeV3>
                                </pre>
                            </label>
                        </div>
                    ) : false
                }
            </div>
        );
    }

    protected clearTimers(): void {
        this.timers.forEach(timer => {
            clearTimeout(timer);
        });

        this.timers = [];
    }

    protected resetListener(): void {
        document.body.removeEventListener(
            "wheel",
            this.wheelEvent
        );
        
        document.body.addEventListener(
            "wheel",
            this.wheelEvent, {
                passive: false
            }
        );
    }

    public componentDidMount(): void {
        document.body.addEventListener(
            "wheel",
            this.wheelEvent, {
                passive: false
            }
        );
        document.body.addEventListener(
            "keydown",
            this.keyDownEvent
        );
        
        this.resetListener();
    }

    public componentDidUpdate(): void {
        this.resetListener();

        if (this.container.current) {
            const content = this.container.current.firstElementChild!.firstElementChild! as HTMLElement;
            content.classList.add(
                this.aniDirection === "down" ? "down-enter" : "up-enter"
            );
        }
    }

    public componentWillUnmount(): void {
        this.clearTimers();
        document.body.removeEventListener("wheel", this.wheelEvent);
        document.body.removeEventListener("keydown", this.keyDownEvent);
    }

    public shiftTo(idx: number): number {
        if (!this.props.children || this.cdHolder) {
            return -1;
        }

        this.showTip = false;

        const to: number = Math.min(
            this.props.children?.length - 1,
            Math.max(
                0, idx
            )
        );

        this.cdHolder = true;
        this.timers.push(
            setTimeout(() => {
                this.cdHolder = false;
                this.clearTimers();
                UnsubscribeWheelEvent();
            }, 360)
        );

        if (this.container.current) {
            const content = this.container.current.firstElementChild!.firstElementChild! as HTMLElement;
            content.classList.add(
                this.aniDirection === "down" ? "down-exit" : "up-exit"
            );
        }

        this.timers.push(
            setTimeout(() => {
                this.setState({
                    idx: to
                });
            }, 160)
        );

        return to;
    }

    public nextPage(): number {
        this.aniDirection = "up";
        const to: number = this.state.idx + 1;
        return this.shiftTo(to);
    }

    public prevPage(): number {
        this.aniDirection = "down";
        const to: number = this.state.idx - 1;
        return this.shiftTo(to);
    }

};
