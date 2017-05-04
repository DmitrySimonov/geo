import React from 'react';

const SortButton = (props) => {
    return(
        <button  className={props.className + " sort"}>
            <span className="arrow-sort-top">
                <svg width="7px" height="5px" viewBox="0 0 7 5" version="1.1">
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.800000012">
                        <g id="10.event-log" transform="translate(-542.000000, -152.000000)" fill="#98A4B8">
                            <g id="Group-10" transform="translate(285.000000, 135.000000)">
                                <g id="Group-9" transform="translate(1.000000, -3.000000)">
                                    <g id="title" transform="translate(19.000000, 18.000000)">
                                        <g id="Group-17" transform="translate(236.819758, 1.000000)">
                                            <g id="arrow-2" transform="translate(9.180242, 6.000000) scale(1, -1) rotate(-270.000000) translate(-9.180242, -6.000000) translate(3.680242, -2.500000)">
                                                <g id="Arrow" transform="translate(-0.000000, 0.000000)">
                                                    <g id="Page-1">
                                                        <g id="10.event-log">
                                                            <g id="Group-10">
                                                                <g id="Group-9">
                                                                    <g id="title">
                                                                        <g id="Group-17" transform="translate(0.819758, 0.000000)">
                                                                            <polygon id="Arrow" transform="translate(7.038035, 13.818182) scale(-1, -1) translate(-7.038035, -13.818182) " points="9.0380349 10.8181818 5.0380349 13.8181818 9.0380349 16.8181818"></polygon>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </span>
            <span className="arrow-sort-bottom">
                <svg width="7px" height="5px" viewBox="0 0 7 5" version="1.1">
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.800000012">
                        <g id="10.event-log" transform="translate(-542.000000, -157.000000)" fill="#98A4B8">
                            <g id="Group-10" transform="translate(285.000000, 135.000000)">
                                <g id="Group-9" transform="translate(1.000000, -3.000000)">
                                    <g id="title" transform="translate(19.000000, 18.000000)">
                                        <g id="Group-17" transform="translate(236.819758, 1.000000)">
                                            <g id="arrow-2" transform="translate(9.180242, 6.000000) scale(1, -1) rotate(-270.000000) translate(-9.180242, -6.000000) translate(3.680242, -2.500000)">
                                                <g id="Arrow" transform="translate(-0.000000, 0.000000)">
                                                    <g id="Page-1">
                                                        <g id="10.event-log">
                                                            <g id="Group-10">
                                                                <g id="Group-9">
                                                                    <g id="title">
                                                                        <g id="Group-17" transform="translate(0.819758, 0.000000)">
                                                                            <polygon id="Arrow-Copy-8" transform="translate(2.038035, 13.818182) scale(1, -1) translate(-2.038035, -13.818182) " points="4.0380349 10.8181818 0.0380349 13.8181818 4.0380349 16.8181818"></polygon>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </span>
        </button>
    );
};

export default SortButton;