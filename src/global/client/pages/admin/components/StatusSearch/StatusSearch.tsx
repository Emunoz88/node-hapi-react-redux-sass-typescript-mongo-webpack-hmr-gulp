/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_StatusSearch.scss';

export class StatusSearch extends React.Component<{}, {}> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        return (
            <section className='section-home container'>
                <div className='row'>
                    <div className='col-sm-7'>
                        <h1 className='page-header'>
                            Status Search
                        </h1>
                    </div>
                </div>
            </section>
        );
    }
}