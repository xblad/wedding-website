import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as GuestsStore from '../store/GuestsStore';

// At runtime, Redux will merge together...
type GuestProps =
    GuestsStore.GuestsState // ... state we've requested from the Redux store
    & typeof GuestsStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters


class Guests extends React.PureComponent<GuestProps> {
    // This method is called when the component is first added to the document
    public componentDidMount() {
        this.ensureDataFetched();
    }

    // This method is called when the route parameters change
    public componentDidUpdate() {
        this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <h1>Гости</h1>
                {this.renderGuests()}
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        this.props.requestGuests();
    }

    private renderGuests() {
        return (
            <div>
                {
                    this.props.guestList.map((guest: GuestsStore.Guest) =>
                        <div id={guest.fullName} className="card mb-3">
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src={guest.img} className="card-img" alt={guest.fullName} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{guest.fullName}</h5>
                                        <p className="card-text">{guest.summary}</p>
                                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.guests, // Selects which state properties are merged into the component's props
    GuestsStore.actionCreators // Selects which action creators are merged into the component's props
)(Guests as any);
