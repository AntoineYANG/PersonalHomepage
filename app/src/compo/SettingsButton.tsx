/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-29 21:17:55 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-08-30 23:23:26
 */

import React, { Component } from "react";
import { HashRouter, Link } from "react-router-dom";
import { Shared } from "../methods/globals";


export class SettingsButton extends Component<{}, {}> {

    public constructor(props: {}) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div style={{
                position: "absolute",
                right: "12px",
                top: "12px",
                pointerEvents: "none"
            }} >
                <HashRouter>
                    <Link to="/settings" >
                        <svg width="40px" height="40px"
                        style={{
                            scale: "144%"
                        }} >
                            <path d={
                                "M32,22 A16.5,16.5,0,0,0,32,18 L29,18 A13.5,13.5,0,0,0,28,15"
                                + " L30,13 A16.5,16.5,0,0,0,27,10 L25,12 A13.5,13.5,0,0,0,22,11"
                                + " L22,8 A16.5,16.5,0,0,0,18,8 L18,11 A13.5,13.5,0,0,0,15,12"
                                + " L13,10 A16.5,16.5,0,0,0,10,13 L12,15 A13.5,13.5,0,0,0,11,18"
                                + " L8,18 A16.5,16.5,0,0,0,8,22 L11,22 A13.5,13.5,0,0,0,12,25"
                                + " L10,27 A16.5,16.5,0,0,0,13,30 L15,28 A13.5,13.5,0,0,0,18,29"
                                + " L18,32 A16.5,16.5,0,0,0,22,32 L22,29 A13.5,13.5,0,0,0,25,28"
                                + " L27,30 A16.5,16.5,0,0,0,30,27 L28,25 A13.5,13.5,0,0,0,29,22"
                            }
                            style={{
                                fill: Shared.theme.colortab.frontground2,
                                pointerEvents: "all",
                                cursor: "none"
                            }}
                            onMouseOver={
                                () => {
                                    Shared.cursorState = "pointer";
                                }
                            }
                            onMouseOut={
                                () => {
                                    Shared.cursorState = "normal";
                                }
                            } />
                            <circle
                            cx={ 20 } cy={ 20 } r={ 5.6 }
                            style={{
                                fill: Shared.theme.colortab.frontground
                            }} />
                        </svg>
                    </Link>
                </HashRouter>
            </div>
        );
    }

};
