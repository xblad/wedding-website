import * as React from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faGlassCheers, faFrown } from '@fortawesome/free-solid-svg-icons';
import * as InvitationStore from '../store/InvitationStore';
import promo from '../videos/Forever twenty.mp4';
import './SaveTheDate.css';

type SaveTheDateProps =
    InvitationStore.InvitationState &
    typeof InvitationStore.actionCreators &
    RouteComponentProps<{ invitationGuid: string }>;

class SaveTheDate extends React.PureComponent<SaveTheDateProps> {
    // This method is called when the component is first added to the document
    public componentDidMount() {
        this.ensureDataFetched();
    }

    // This method is called when the route parameters change
    public componentDidUpdate(prevProps : SaveTheDateProps) {
        this.ensureDataFetched();
        if (!prevProps.invitationObject && this.props.invitationObject)
            this.props.history.replace(`/save-the-date/${this.props.invitationObject.invitationGuid}`);
        if (prevProps.lastError !== this.props.lastError) alert(this.props.lastError);
    }

    public render() {
        return (
            <React.Fragment>
                <div>
                    <ReactPlayer id="promo" className="mx-auto" width="90%" height="100%" url={promo} playing muted loop />
                </div>
                <div className="info row">
                    <div className="text-center col-lg">
                        <h2 className="appeal" title="Оставьте эту дату свободной для нас!">Save our Date!</h2>
                        <h1 className="names" title="Даня и Катя">Dan & Kate</h1>
                        <h1 className="date" title="4 августа 2020">
                            <span className="cyan">4</span>
                            <span className="magenta">.8.</span>
                            <span className="yellow">20</span></h1>
                        <p><FontAwesomeIcon className="magenta" icon={faMapMarkerAlt}/> Prague</p>
                    </div>
                    <div className="form-group text-center col my-auto">
                        {(() => {
                            if (!this.props.invitationObject || !this.props.invitationObject.invitationGuid)
                                return <div>
                                    <input type="text" className="form-control text-center"
                                        placeholder="Invitation ID" title="ID Приглашения"
                                        value={this.props.invitationObject && this.props.invitationObject.invitationGuid}
                                        onChange={event => this.props.requestInvitation(event.target.value)}
                                        ref={(input) => { input && input.focus() }}
                                        disabled={this.props.isLoading} />
                                </div>;
                            else if (this.props.invitationObject.isGoing === true)
                                return <div>
                                    <h3 title={this.props.invitationObject.firstName + ', спасибо, что почтите нас своим присутствием! Увидимся :)'}>{this.props.invitationObject.firstName}, thanks for indicating you are coming! See ya <FontAwesomeIcon className="yellow" icon={faGlassCheers} /></h3>
                                </div>;
                            else if (this.props.invitationObject.isGoing === false)
                                return <div>
                                    <h3 title={this.props.invitationObject.firstName + ', очень жаль, что не придете :('}>{this.props.invitationObject.firstName}, it's a shame you're not coming <FontAwesomeIcon className="yellow" icon={faFrown} /></h3>
                                </div>;
                            else
                                return <div>
                                    <p className="mb-3" title={this.props.invitationObject.firstName + ', пожалуйста дайте нам знать, если придёте'}>Dear {this.props.invitationObject.firstName}, please indicate your attendance</p>
                                    <button type="button" className="btn btn-success btn-lg ml-3" onClick={() => { this.props.indicateAttendance(true); }} title="Я в деле!" disabled={this.props.isLoading} >I'm in</button>
                                    <button type="button" className="btn btn-link btn-lg ml-3" onClick={() => { this.props.indicateAttendance(false); }} title="Не могу прийти :(" disabled={this.props.isLoading} >Sorry, can't make it</button>
                                </div>;
                        })()}
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        const invitationGuid = this.props.match.params.invitationGuid;
        this.props.requestInvitation(invitationGuid);
    }
};

export default connect(
    (state: ApplicationState) => state.invitation,
    InvitationStore.actionCreators
)(SaveTheDate as any);
