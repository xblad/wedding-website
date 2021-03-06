﻿import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faGlassCheers, faFrown, faPlay, faVolumeMute, faSmileBeam, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import * as InvitationStore from '../store/InvitationStore';
import promoVideo from '../videos/Forever_twenty.mp4';
import './SaveTheDate.css';

type SaveTheDateProps =
    InvitationStore.InvitationState &
    typeof InvitationStore.actionCreators &
    RouteComponentProps<{ invitationGuid: string }>;

class SaveTheDate extends React.PureComponent<SaveTheDateProps> {
    promo: HTMLVideoElement | null = null;
    promoPauseIndicator: HTMLDivElement | null = null;
    promoMuteIndicator: HTMLDivElement | null = null;

    // This method is called when the component is first added to the document
    public componentDidMount() {
        this.ensureDataFetched();
        this.ensureAutoplay();
    }

    private async ensureAutoplay() {
        if (this.promo == null) return;
        let v = this.promo;
        let promoTag : any = document.getElementById("promo");
        if (promoTag !== null) {
            promoTag.disablePictureInPicture = true;
            promoTag.disableRemotePlayback = true;
        }

        let promoUpdateControls = () =>
            this.updatePromoIndicators(this.promo, this.promoPauseIndicator, this.promoMuteIndicator);
        v.addEventListener("play", promoUpdateControls, true);
        v.addEventListener("pause", promoUpdateControls, true);
        v.addEventListener("volumechange", promoUpdateControls, true);

        try {
            await v.play();
        }
        catch {
            v.muted = true;
            try {
                await v.play();
            }
            catch {
                v.muted = false;
            }
        }

    }

    private promoPlayPauseMute(v: HTMLVideoElement | null, pauseIndicator: HTMLDivElement | null, muteIndicator: HTMLDivElement | null) {

        if (!v || !pauseIndicator || !muteIndicator)
            return;

        if (v.paused) {
            v.play();
        }
        else if (v.muted) {
            v.muted = false;
        }
        else {
            v.pause();
        }
    }

    private updatePromoIndicators(v: HTMLVideoElement | null, pauseIndicator: HTMLDivElement | null, muteIndicator: HTMLDivElement | null) {

        if (!v || !pauseIndicator || !muteIndicator)
            return;

        if (v.paused) {
            muteIndicator.hidden = true;
            pauseIndicator.hidden = false;
        }
        else if (v.muted) {
            muteIndicator.hidden = false;
            pauseIndicator.hidden = true;
        }
        else {
            muteIndicator.hidden = true;
            pauseIndicator.hidden = true;
        }
    }

    // This method is called when the route parameters change
    public componentDidUpdate(prevProps: SaveTheDateProps) {
        if (prevProps.lastError !== this.props.lastError) alert(this.props.lastError);
    }

    public render() {
        return (
            <React.Fragment>
                <div id="promo-wrapper" className="d-flex" onClick={e =>
                    this.promoPlayPauseMute(this.promo, this.promoPauseIndicator, this.promoMuteIndicator)}>
                    <video id="promo" className="mx-auto"
                        width="100%" height="100%" loop
                        playsInline controlsList="nodownload nofullscreen noremoteplayback"
                        ref={v => this.promo = v} >
                        <source src={promoVideo} type="video/mp4" />
                    </video>
                    <div id="promo-playpause" className="row justify-content-center align-self-center"
                        hidden ref={b => this.promoPauseIndicator = b}>
                        <FontAwesomeIcon className="fa-4x" icon={faPlay} />
                    </div>
                    <div id="promo-unmute" className="row"
                        hidden ref={b => this.promoMuteIndicator = b}>
                        <FontAwesomeIcon className="fa-2x" icon={faVolumeMute} />
                    </div>
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
                    <div id="invitationBorder" className="form-group text-center col my-auto">
                        {(() => {
                        if (!this.props.invitationObject || !this.props.invitationObject.invitationGuid)
                            return <div>
                                <input type="text" className="form-control text-center"
                                    placeholder="ID Приглашения" title="Invitation ID"
                                    value={this.props.invitationObject && this.props.invitationObject.invitationGuid}
                                    onChange={event => this.props.requestInvitation(event.target.value)}
                                    ref={(input) => { input && input.focus() }}
                                    disabled={this.props.isLoading} />
                            </div>;
                        else if (this.props.invitationObject.isGoing === true)
                            return <div>
                                <h3>{this.props.invitationObject.firstName}, спасибо, что почтите нас своим присутствием! Увидимся <FontAwesomeIcon className="yellow" icon={faGlassCheers} /></h3>
                            </div>;
                        else if (this.props.invitationObject.isGoing === false)
                            return <div>
                                <h3>{this.props.invitationObject.firstName}, очень жаль, что не придете <FontAwesomeIcon className="yellow" icon={faFrown} /></h3>
                            </div>;
                        else
                            return <div>
                                <p className="mb-3">Привет, {this.props.invitationObject.firstName}! Согласны ли Вы стать гостем на нашей свадьбе?</p>
                                <button type="button" className="btn btn-success btn-lg ml-3" onClick={() => { this.props.indicateAttendance(true); }} disabled={this.props.isLoading} >Да <FontAwesomeIcon className="yellow" icon={faSmileBeam} /></button>
                                <button type="button" className="btn btn-link btn-lg ml-3" onClick={() => { this.props.indicateAttendance(false); }} disabled={this.props.isLoading} >Нет <FontAwesomeIcon className="magenta" icon={faHeartBroken} /></button>
                            </div>;
                            })()}
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        let invitationGuid = this.props.match.params.invitationGuid;
        this.props.requestInvitation(invitationGuid);
    }
};

export default connect(
    (state: ApplicationState) => state.invitation,
    InvitationStore.actionCreators
)(SaveTheDate as any);
