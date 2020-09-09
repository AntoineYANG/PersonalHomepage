/*
 * @Author: Kanata You 
 * @Date: 2020-09-09 22:17:14 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-09-09 22:24:38
 */

import React from "react";
import { Shared } from "../methods/globals";


export const ContactMe = (props: {}): JSX.Element => {
    return (
        <div key="links" style={{
            margin: "1.2vh 0 0.3vh",
            padding: "1.6vh 1vw 0",
            display: "inline-flex",
            borderTop: `1px solid ${ Shared.theme.colortab.color }`
        }} >
            <div key="github"
            style={{
                margin: "0 calc(1vw + 4px)",
                padding: "0 2px",
                display: "flex",
                alignItems: "center"
            }}
            onMouseEnter={
                () => {
                    Shared.cursorState = "pointer";
                }
            }
            onMouseLeave={
                () => {
                    Shared.cursorState = "normal";
                }
            } >
                <a href="https://github.com/AntoineYANG" target="new"
                style={{
                    cursor: "none"
                }} >
                    <svg viewBox="0 0 16 16" version="1.1"
                    aria-hidden="true"
                    style={{
                        width: "calc(8px + 1vw)",
                        height: "calc(8px + 1vw)",
                        transform: "translateY(1.2px)"
                    }} >
                        <path fillRule="evenodd"
                        d={
                            "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-"
                            + ".17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-"
                            + ".94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-"
                            + ".01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.8"
                            + "7.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2."
                            + "15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.3"
                            + "2-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82"
                            + ".44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.8"
                            + "7 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01"
                            + " 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                        }
                        style={{
                            fill: Shared.theme.colortab.color,
                            pointerEvents: "none"
                        }} />
                    </svg>
                </a>
            </div>
            <div key="npm"
            style={{
                margin: "0 calc(1vw + 4px)",
                padding: "0 2px",
                display: "flex",
                alignItems: "center"
            }}
            onMouseEnter={
                () => {
                    Shared.cursorState = "pointer";
                }
            }
            onMouseLeave={
                () => {
                    Shared.cursorState = "normal";
                }
            } >
                <a href="https://www.npmjs.com/~kanatayou" target="new"
                style={{
                    cursor: "none"
                }} >
                    <svg viewBox="0 0 780 250"
                    style={{
                        width: "calc(8px + 1vw)",
                        height: "calc(8px + 1vw)"
                    }} >
                        <path d={
                            "M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z "
                            + "M480,0v200h100V50h50v150h50V50h50v150h50V0H480z "
                            + "M0,200h100V50h50v150h50V0H0V200z"
                        }
                        style={{
                            fill: Shared.theme.colortab.color
                        }} />
                    </svg>
                </a>
            </div>
        </div>
    );
};
