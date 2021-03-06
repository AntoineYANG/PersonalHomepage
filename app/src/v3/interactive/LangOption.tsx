/*
 * @Author: Kanata You 
 * @Date: 2020-12-09 18:20:50 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-16 20:16:14
 */

import React, { Component } from "react";
import { Lang } from "../TypesV3";
import { connect } from "react-redux";
import { LangConfig } from "../reducers/LangConfig";
import Design from "../design/design";


interface FfLangOptionProps {
    lang: Lang;
    setLang: (lang: Lang) => any;
};

interface FfLangOptionState {
    opened: boolean;
};

// @ts-ignore
@connect(LangConfig.mapStateToProps, LangConfig.mapDispatchToProps)
class FfLangOption extends Component<FfLangOptionProps, FfLangOptionState> {

    public constructor(props: FfLangOptionProps) {
        super(props);
        this.state = {
            opened: false
        };
    }

    public render(): JSX.Element {
        return (
            <div>
                <label key="chosen" title="language" tabIndex={ 1 }
                onClick={
                    () => {
                        this.setState({
                            opened: !this.state.opened
                        });
                    }
                } >
                    <span>
                        { this.props.lang }
                    </span>
                    <svg width="20px" height="20px" viewBox="0 0 10 10" >
                        <path d="M2,5 L5,8 L8,5" />
                    </svg>
                </label>
                {
                    this.state.opened ? (
                        (["CH", "JP", "EN"] as Array<Lang>).map(d => {
                            return (
                                <label key={ d } className="option" tabIndex={ 1 }
                                style={{
                                    cursor: d !== this.props.lang ? "pointer" : "default",
                                    color: d === this.props.lang ? Design.white : undefined
                                }}
                                onClick={
                                    () => {
                                        if (d !== this.props.lang) {
                                            this.props.setLang(d);
                                        }
                                        this.setState({
                                            opened: false
                                        });
                                    }
                                } >
                                    { d }
                                </label>
                            );
                        })
                    ) : null
                }
            </div>
        );
    }

};

export const LangOption: React.FC = _props => {
    return (
        // @ts-ignore
        <FfLangOption />
    );
};
