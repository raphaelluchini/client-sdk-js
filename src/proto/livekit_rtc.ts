/* eslint-disable */
import { TrackType, Room, ParticipantInfo, TrackInfo, trackTypeFromJSON, trackTypeToJSON } from './livekit_models';
import { Writer, Reader } from 'protobufjs/minimal';


export interface SignalRequest {
  /**
   *  initial join exchange, for publisher
   */
  offer?: SessionDescription | undefined;
  /**
   *  participant answering publisher offer
   */
  answer?: SessionDescription | undefined;
  trickle?: TrickleRequest | undefined;
  addTrack?: AddTrackRequest | undefined;
  /**
   *  mute the participant's published tracks
   */
  mute?: MuteTrackRequest | undefined;
  /**
   *  Subscribe or unsubscribe from tracks
   */
  subscription?: UpdateSubscription | undefined;
  /**
   *  Update settings of subscribed tracks
   */
  trackSetting?: UpdateTrackSettings | undefined;
}

export interface SignalResponse {
  /**
   *  sent when join is accepted
   */
  join?: JoinResponse | undefined;
  /**
   *  sent when server answers publisher
   */
  answer?: SessionDescription | undefined;
  /**
   *  sent when server is sending subscriber an offer
   */
  offer?: SessionDescription | undefined;
  /**
   *  sent when an ICE candidate is available
   */
  trickle?: TrickleRequest | undefined;
  /**
   *  sent when participants in the room has changed
   */
  update?: ParticipantUpdate | undefined;
  /**
   *  sent to the participant when their track has been published
   */
  trackPublished?: TrackPublishedResponse | undefined;
  /**
   *  list of active speakers
   */
  speaker?: ActiveSpeakerUpdate | undefined;
}

export interface AddTrackRequest {
  /**
   *  client ID of track, to match it when RTC track is received
   */
  cid: string;
  name: string;
  type: TrackType;
}

export interface TrickleRequest {
  candidateInit: string;
  target: SignalTarget;
}

export interface MuteTrackRequest {
  sid: string;
  muted: boolean;
}

/**
 *  empty
 */
export interface NegotiationRequest {
}

export interface JoinResponse {
  room?: Room;
  participant?: ParticipantInfo;
  otherParticipants: ParticipantInfo[];
  serverVersion: string;
  iceServers: ICEServer[];
}

export interface TrackPublishedResponse {
  cid: string;
  track?: TrackInfo;
}

export interface SessionDescription {
  /**
   *  "answer" | "offer" | "pranswer" | "rollback"
   */
  type: string;
  sdp: string;
}

export interface ParticipantUpdate {
  participants: ParticipantInfo[];
}

export interface ActiveSpeakerUpdate {
  speakers: SpeakerInfo[];
}

export interface SpeakerInfo {
  sid: string;
  /**
   *  audio level, 0-1.0, 1 is loudest
   */
  level: number;
  /**
   *  true if speaker is currently active
   */
  active: boolean;
}

export interface UpdateSubscription {
  trackSids: string[];
  subscribe: boolean;
  quality: VideoQuality;
}

export interface UpdateTrackSettings {
  trackSids: string[];
  disabled: boolean;
  quality: VideoQuality;
}

export interface ICEServer {
  urls: string[];
  username: string;
  credential: string;
}

const baseSignalRequest: object = {
};

const baseSignalResponse: object = {
};

const baseAddTrackRequest: object = {
  cid: "",
  name: "",
  type: 0,
};

const baseTrickleRequest: object = {
  candidateInit: "",
  target: 0,
};

const baseMuteTrackRequest: object = {
  sid: "",
  muted: false,
};

const baseNegotiationRequest: object = {
};

const baseJoinResponse: object = {
  serverVersion: "",
};

const baseTrackPublishedResponse: object = {
  cid: "",
};

const baseSessionDescription: object = {
  type: "",
  sdp: "",
};

const baseParticipantUpdate: object = {
};

const baseActiveSpeakerUpdate: object = {
};

const baseSpeakerInfo: object = {
  sid: "",
  level: 0,
  active: false,
};

const baseUpdateSubscription: object = {
  trackSids: "",
  subscribe: false,
  quality: 0,
};

const baseUpdateTrackSettings: object = {
  trackSids: "",
  disabled: false,
  quality: 0,
};

const baseICEServer: object = {
  urls: "",
  username: "",
  credential: "",
};

export const protobufPackage = 'livekit'

export enum SignalTarget {
  PUBLISHER = 0,
  SUBSCRIBER = 1,
  UNRECOGNIZED = -1,
}

export function signalTargetFromJSON(object: any): SignalTarget {
  switch (object) {
    case 0:
    case "PUBLISHER":
      return SignalTarget.PUBLISHER;
    case 1:
    case "SUBSCRIBER":
      return SignalTarget.SUBSCRIBER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SignalTarget.UNRECOGNIZED;
  }
}

export function signalTargetToJSON(object: SignalTarget): string {
  switch (object) {
    case SignalTarget.PUBLISHER:
      return "PUBLISHER";
    case SignalTarget.SUBSCRIBER:
      return "SUBSCRIBER";
    default:
      return "UNKNOWN";
  }
}

export enum VideoQuality {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
  UNRECOGNIZED = -1,
}

export function videoQualityFromJSON(object: any): VideoQuality {
  switch (object) {
    case 0:
    case "LOW":
      return VideoQuality.LOW;
    case 1:
    case "MEDIUM":
      return VideoQuality.MEDIUM;
    case 2:
    case "HIGH":
      return VideoQuality.HIGH;
    case -1:
    case "UNRECOGNIZED":
    default:
      return VideoQuality.UNRECOGNIZED;
  }
}

export function videoQualityToJSON(object: VideoQuality): string {
  switch (object) {
    case VideoQuality.LOW:
      return "LOW";
    case VideoQuality.MEDIUM:
      return "MEDIUM";
    case VideoQuality.HIGH:
      return "HIGH";
    default:
      return "UNKNOWN";
  }
}

export const SignalRequest = {
  encode(message: SignalRequest, writer: Writer = Writer.create()): Writer {
    if (message.offer !== undefined) {
      SessionDescription.encode(message.offer, writer.uint32(10).fork()).ldelim();
    }
    if (message.answer !== undefined) {
      SessionDescription.encode(message.answer, writer.uint32(18).fork()).ldelim();
    }
    if (message.trickle !== undefined) {
      TrickleRequest.encode(message.trickle, writer.uint32(26).fork()).ldelim();
    }
    if (message.addTrack !== undefined) {
      AddTrackRequest.encode(message.addTrack, writer.uint32(34).fork()).ldelim();
    }
    if (message.mute !== undefined) {
      MuteTrackRequest.encode(message.mute, writer.uint32(42).fork()).ldelim();
    }
    if (message.subscription !== undefined) {
      UpdateSubscription.encode(message.subscription, writer.uint32(50).fork()).ldelim();
    }
    if (message.trackSetting !== undefined) {
      UpdateTrackSettings.encode(message.trackSetting, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SignalRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSignalRequest } as SignalRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.offer = SessionDescription.decode(reader, reader.uint32());
          break;
        case 2:
          message.answer = SessionDescription.decode(reader, reader.uint32());
          break;
        case 3:
          message.trickle = TrickleRequest.decode(reader, reader.uint32());
          break;
        case 4:
          message.addTrack = AddTrackRequest.decode(reader, reader.uint32());
          break;
        case 5:
          message.mute = MuteTrackRequest.decode(reader, reader.uint32());
          break;
        case 6:
          message.subscription = UpdateSubscription.decode(reader, reader.uint32());
          break;
        case 7:
          message.trackSetting = UpdateTrackSettings.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SignalRequest {
    const message = { ...baseSignalRequest } as SignalRequest;
    if (object.offer !== undefined && object.offer !== null) {
      message.offer = SessionDescription.fromJSON(object.offer);
    } else {
      message.offer = undefined;
    }
    if (object.answer !== undefined && object.answer !== null) {
      message.answer = SessionDescription.fromJSON(object.answer);
    } else {
      message.answer = undefined;
    }
    if (object.trickle !== undefined && object.trickle !== null) {
      message.trickle = TrickleRequest.fromJSON(object.trickle);
    } else {
      message.trickle = undefined;
    }
    if (object.addTrack !== undefined && object.addTrack !== null) {
      message.addTrack = AddTrackRequest.fromJSON(object.addTrack);
    } else {
      message.addTrack = undefined;
    }
    if (object.mute !== undefined && object.mute !== null) {
      message.mute = MuteTrackRequest.fromJSON(object.mute);
    } else {
      message.mute = undefined;
    }
    if (object.subscription !== undefined && object.subscription !== null) {
      message.subscription = UpdateSubscription.fromJSON(object.subscription);
    } else {
      message.subscription = undefined;
    }
    if (object.trackSetting !== undefined && object.trackSetting !== null) {
      message.trackSetting = UpdateTrackSettings.fromJSON(object.trackSetting);
    } else {
      message.trackSetting = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<SignalRequest>): SignalRequest {
    const message = { ...baseSignalRequest } as SignalRequest;
    if (object.offer !== undefined && object.offer !== null) {
      message.offer = SessionDescription.fromPartial(object.offer);
    } else {
      message.offer = undefined;
    }
    if (object.answer !== undefined && object.answer !== null) {
      message.answer = SessionDescription.fromPartial(object.answer);
    } else {
      message.answer = undefined;
    }
    if (object.trickle !== undefined && object.trickle !== null) {
      message.trickle = TrickleRequest.fromPartial(object.trickle);
    } else {
      message.trickle = undefined;
    }
    if (object.addTrack !== undefined && object.addTrack !== null) {
      message.addTrack = AddTrackRequest.fromPartial(object.addTrack);
    } else {
      message.addTrack = undefined;
    }
    if (object.mute !== undefined && object.mute !== null) {
      message.mute = MuteTrackRequest.fromPartial(object.mute);
    } else {
      message.mute = undefined;
    }
    if (object.subscription !== undefined && object.subscription !== null) {
      message.subscription = UpdateSubscription.fromPartial(object.subscription);
    } else {
      message.subscription = undefined;
    }
    if (object.trackSetting !== undefined && object.trackSetting !== null) {
      message.trackSetting = UpdateTrackSettings.fromPartial(object.trackSetting);
    } else {
      message.trackSetting = undefined;
    }
    return message;
  },
  toJSON(message: SignalRequest): unknown {
    const obj: any = {};
    message.offer !== undefined && (obj.offer = message.offer ? SessionDescription.toJSON(message.offer) : undefined);
    message.answer !== undefined && (obj.answer = message.answer ? SessionDescription.toJSON(message.answer) : undefined);
    message.trickle !== undefined && (obj.trickle = message.trickle ? TrickleRequest.toJSON(message.trickle) : undefined);
    message.addTrack !== undefined && (obj.addTrack = message.addTrack ? AddTrackRequest.toJSON(message.addTrack) : undefined);
    message.mute !== undefined && (obj.mute = message.mute ? MuteTrackRequest.toJSON(message.mute) : undefined);
    message.subscription !== undefined && (obj.subscription = message.subscription ? UpdateSubscription.toJSON(message.subscription) : undefined);
    message.trackSetting !== undefined && (obj.trackSetting = message.trackSetting ? UpdateTrackSettings.toJSON(message.trackSetting) : undefined);
    return obj;
  },
};

export const SignalResponse = {
  encode(message: SignalResponse, writer: Writer = Writer.create()): Writer {
    if (message.join !== undefined) {
      JoinResponse.encode(message.join, writer.uint32(10).fork()).ldelim();
    }
    if (message.answer !== undefined) {
      SessionDescription.encode(message.answer, writer.uint32(18).fork()).ldelim();
    }
    if (message.offer !== undefined) {
      SessionDescription.encode(message.offer, writer.uint32(26).fork()).ldelim();
    }
    if (message.trickle !== undefined) {
      TrickleRequest.encode(message.trickle, writer.uint32(34).fork()).ldelim();
    }
    if (message.update !== undefined) {
      ParticipantUpdate.encode(message.update, writer.uint32(42).fork()).ldelim();
    }
    if (message.trackPublished !== undefined) {
      TrackPublishedResponse.encode(message.trackPublished, writer.uint32(50).fork()).ldelim();
    }
    if (message.speaker !== undefined) {
      ActiveSpeakerUpdate.encode(message.speaker, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SignalResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSignalResponse } as SignalResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.join = JoinResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.answer = SessionDescription.decode(reader, reader.uint32());
          break;
        case 3:
          message.offer = SessionDescription.decode(reader, reader.uint32());
          break;
        case 4:
          message.trickle = TrickleRequest.decode(reader, reader.uint32());
          break;
        case 5:
          message.update = ParticipantUpdate.decode(reader, reader.uint32());
          break;
        case 6:
          message.trackPublished = TrackPublishedResponse.decode(reader, reader.uint32());
          break;
        case 7:
          message.speaker = ActiveSpeakerUpdate.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SignalResponse {
    const message = { ...baseSignalResponse } as SignalResponse;
    if (object.join !== undefined && object.join !== null) {
      message.join = JoinResponse.fromJSON(object.join);
    } else {
      message.join = undefined;
    }
    if (object.answer !== undefined && object.answer !== null) {
      message.answer = SessionDescription.fromJSON(object.answer);
    } else {
      message.answer = undefined;
    }
    if (object.offer !== undefined && object.offer !== null) {
      message.offer = SessionDescription.fromJSON(object.offer);
    } else {
      message.offer = undefined;
    }
    if (object.trickle !== undefined && object.trickle !== null) {
      message.trickle = TrickleRequest.fromJSON(object.trickle);
    } else {
      message.trickle = undefined;
    }
    if (object.update !== undefined && object.update !== null) {
      message.update = ParticipantUpdate.fromJSON(object.update);
    } else {
      message.update = undefined;
    }
    if (object.trackPublished !== undefined && object.trackPublished !== null) {
      message.trackPublished = TrackPublishedResponse.fromJSON(object.trackPublished);
    } else {
      message.trackPublished = undefined;
    }
    if (object.speaker !== undefined && object.speaker !== null) {
      message.speaker = ActiveSpeakerUpdate.fromJSON(object.speaker);
    } else {
      message.speaker = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<SignalResponse>): SignalResponse {
    const message = { ...baseSignalResponse } as SignalResponse;
    if (object.join !== undefined && object.join !== null) {
      message.join = JoinResponse.fromPartial(object.join);
    } else {
      message.join = undefined;
    }
    if (object.answer !== undefined && object.answer !== null) {
      message.answer = SessionDescription.fromPartial(object.answer);
    } else {
      message.answer = undefined;
    }
    if (object.offer !== undefined && object.offer !== null) {
      message.offer = SessionDescription.fromPartial(object.offer);
    } else {
      message.offer = undefined;
    }
    if (object.trickle !== undefined && object.trickle !== null) {
      message.trickle = TrickleRequest.fromPartial(object.trickle);
    } else {
      message.trickle = undefined;
    }
    if (object.update !== undefined && object.update !== null) {
      message.update = ParticipantUpdate.fromPartial(object.update);
    } else {
      message.update = undefined;
    }
    if (object.trackPublished !== undefined && object.trackPublished !== null) {
      message.trackPublished = TrackPublishedResponse.fromPartial(object.trackPublished);
    } else {
      message.trackPublished = undefined;
    }
    if (object.speaker !== undefined && object.speaker !== null) {
      message.speaker = ActiveSpeakerUpdate.fromPartial(object.speaker);
    } else {
      message.speaker = undefined;
    }
    return message;
  },
  toJSON(message: SignalResponse): unknown {
    const obj: any = {};
    message.join !== undefined && (obj.join = message.join ? JoinResponse.toJSON(message.join) : undefined);
    message.answer !== undefined && (obj.answer = message.answer ? SessionDescription.toJSON(message.answer) : undefined);
    message.offer !== undefined && (obj.offer = message.offer ? SessionDescription.toJSON(message.offer) : undefined);
    message.trickle !== undefined && (obj.trickle = message.trickle ? TrickleRequest.toJSON(message.trickle) : undefined);
    message.update !== undefined && (obj.update = message.update ? ParticipantUpdate.toJSON(message.update) : undefined);
    message.trackPublished !== undefined && (obj.trackPublished = message.trackPublished ? TrackPublishedResponse.toJSON(message.trackPublished) : undefined);
    message.speaker !== undefined && (obj.speaker = message.speaker ? ActiveSpeakerUpdate.toJSON(message.speaker) : undefined);
    return obj;
  },
};

export const AddTrackRequest = {
  encode(message: AddTrackRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.cid);
    writer.uint32(18).string(message.name);
    writer.uint32(24).int32(message.type);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): AddTrackRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAddTrackRequest } as AddTrackRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.type = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AddTrackRequest {
    const message = { ...baseAddTrackRequest } as AddTrackRequest;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid);
    } else {
      message.cid = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = trackTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<AddTrackRequest>): AddTrackRequest {
    const message = { ...baseAddTrackRequest } as AddTrackRequest;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid;
    } else {
      message.cid = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    return message;
  },
  toJSON(message: AddTrackRequest): unknown {
    const obj: any = {};
    message.cid !== undefined && (obj.cid = message.cid);
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined && (obj.type = trackTypeToJSON(message.type));
    return obj;
  },
};

export const TrickleRequest = {
  encode(message: TrickleRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.candidateInit);
    writer.uint32(16).int32(message.target);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): TrickleRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTrickleRequest } as TrickleRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.candidateInit = reader.string();
          break;
        case 2:
          message.target = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TrickleRequest {
    const message = { ...baseTrickleRequest } as TrickleRequest;
    if (object.candidateInit !== undefined && object.candidateInit !== null) {
      message.candidateInit = String(object.candidateInit);
    } else {
      message.candidateInit = "";
    }
    if (object.target !== undefined && object.target !== null) {
      message.target = signalTargetFromJSON(object.target);
    } else {
      message.target = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<TrickleRequest>): TrickleRequest {
    const message = { ...baseTrickleRequest } as TrickleRequest;
    if (object.candidateInit !== undefined && object.candidateInit !== null) {
      message.candidateInit = object.candidateInit;
    } else {
      message.candidateInit = "";
    }
    if (object.target !== undefined && object.target !== null) {
      message.target = object.target;
    } else {
      message.target = 0;
    }
    return message;
  },
  toJSON(message: TrickleRequest): unknown {
    const obj: any = {};
    message.candidateInit !== undefined && (obj.candidateInit = message.candidateInit);
    message.target !== undefined && (obj.target = signalTargetToJSON(message.target));
    return obj;
  },
};

export const MuteTrackRequest = {
  encode(message: MuteTrackRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.sid);
    writer.uint32(16).bool(message.muted);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): MuteTrackRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMuteTrackRequest } as MuteTrackRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sid = reader.string();
          break;
        case 2:
          message.muted = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MuteTrackRequest {
    const message = { ...baseMuteTrackRequest } as MuteTrackRequest;
    if (object.sid !== undefined && object.sid !== null) {
      message.sid = String(object.sid);
    } else {
      message.sid = "";
    }
    if (object.muted !== undefined && object.muted !== null) {
      message.muted = Boolean(object.muted);
    } else {
      message.muted = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<MuteTrackRequest>): MuteTrackRequest {
    const message = { ...baseMuteTrackRequest } as MuteTrackRequest;
    if (object.sid !== undefined && object.sid !== null) {
      message.sid = object.sid;
    } else {
      message.sid = "";
    }
    if (object.muted !== undefined && object.muted !== null) {
      message.muted = object.muted;
    } else {
      message.muted = false;
    }
    return message;
  },
  toJSON(message: MuteTrackRequest): unknown {
    const obj: any = {};
    message.sid !== undefined && (obj.sid = message.sid);
    message.muted !== undefined && (obj.muted = message.muted);
    return obj;
  },
};

export const NegotiationRequest = {
  encode(_: NegotiationRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): NegotiationRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNegotiationRequest } as NegotiationRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): NegotiationRequest {
    const message = { ...baseNegotiationRequest } as NegotiationRequest;
    return message;
  },
  fromPartial(_: DeepPartial<NegotiationRequest>): NegotiationRequest {
    const message = { ...baseNegotiationRequest } as NegotiationRequest;
    return message;
  },
  toJSON(_: NegotiationRequest): unknown {
    const obj: any = {};
    return obj;
  },
};

export const JoinResponse = {
  encode(message: JoinResponse, writer: Writer = Writer.create()): Writer {
    if (message.room !== undefined && message.room !== undefined) {
      Room.encode(message.room, writer.uint32(10).fork()).ldelim();
    }
    if (message.participant !== undefined && message.participant !== undefined) {
      ParticipantInfo.encode(message.participant, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.otherParticipants) {
      ParticipantInfo.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    writer.uint32(34).string(message.serverVersion);
    for (const v of message.iceServers) {
      ICEServer.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): JoinResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseJoinResponse } as JoinResponse;
    message.otherParticipants = [];
    message.iceServers = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.room = Room.decode(reader, reader.uint32());
          break;
        case 2:
          message.participant = ParticipantInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.otherParticipants.push(ParticipantInfo.decode(reader, reader.uint32()));
          break;
        case 4:
          message.serverVersion = reader.string();
          break;
        case 5:
          message.iceServers.push(ICEServer.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): JoinResponse {
    const message = { ...baseJoinResponse } as JoinResponse;
    message.otherParticipants = [];
    message.iceServers = [];
    if (object.room !== undefined && object.room !== null) {
      message.room = Room.fromJSON(object.room);
    } else {
      message.room = undefined;
    }
    if (object.participant !== undefined && object.participant !== null) {
      message.participant = ParticipantInfo.fromJSON(object.participant);
    } else {
      message.participant = undefined;
    }
    if (object.otherParticipants !== undefined && object.otherParticipants !== null) {
      for (const e of object.otherParticipants) {
        message.otherParticipants.push(ParticipantInfo.fromJSON(e));
      }
    }
    if (object.serverVersion !== undefined && object.serverVersion !== null) {
      message.serverVersion = String(object.serverVersion);
    } else {
      message.serverVersion = "";
    }
    if (object.iceServers !== undefined && object.iceServers !== null) {
      for (const e of object.iceServers) {
        message.iceServers.push(ICEServer.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<JoinResponse>): JoinResponse {
    const message = { ...baseJoinResponse } as JoinResponse;
    message.otherParticipants = [];
    message.iceServers = [];
    if (object.room !== undefined && object.room !== null) {
      message.room = Room.fromPartial(object.room);
    } else {
      message.room = undefined;
    }
    if (object.participant !== undefined && object.participant !== null) {
      message.participant = ParticipantInfo.fromPartial(object.participant);
    } else {
      message.participant = undefined;
    }
    if (object.otherParticipants !== undefined && object.otherParticipants !== null) {
      for (const e of object.otherParticipants) {
        message.otherParticipants.push(ParticipantInfo.fromPartial(e));
      }
    }
    if (object.serverVersion !== undefined && object.serverVersion !== null) {
      message.serverVersion = object.serverVersion;
    } else {
      message.serverVersion = "";
    }
    if (object.iceServers !== undefined && object.iceServers !== null) {
      for (const e of object.iceServers) {
        message.iceServers.push(ICEServer.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: JoinResponse): unknown {
    const obj: any = {};
    message.room !== undefined && (obj.room = message.room ? Room.toJSON(message.room) : undefined);
    message.participant !== undefined && (obj.participant = message.participant ? ParticipantInfo.toJSON(message.participant) : undefined);
    if (message.otherParticipants) {
      obj.otherParticipants = message.otherParticipants.map(e => e ? ParticipantInfo.toJSON(e) : undefined);
    } else {
      obj.otherParticipants = [];
    }
    message.serverVersion !== undefined && (obj.serverVersion = message.serverVersion);
    if (message.iceServers) {
      obj.iceServers = message.iceServers.map(e => e ? ICEServer.toJSON(e) : undefined);
    } else {
      obj.iceServers = [];
    }
    return obj;
  },
};

export const TrackPublishedResponse = {
  encode(message: TrackPublishedResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.cid);
    if (message.track !== undefined && message.track !== undefined) {
      TrackInfo.encode(message.track, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): TrackPublishedResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTrackPublishedResponse } as TrackPublishedResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string();
          break;
        case 2:
          message.track = TrackInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TrackPublishedResponse {
    const message = { ...baseTrackPublishedResponse } as TrackPublishedResponse;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid);
    } else {
      message.cid = "";
    }
    if (object.track !== undefined && object.track !== null) {
      message.track = TrackInfo.fromJSON(object.track);
    } else {
      message.track = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<TrackPublishedResponse>): TrackPublishedResponse {
    const message = { ...baseTrackPublishedResponse } as TrackPublishedResponse;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid;
    } else {
      message.cid = "";
    }
    if (object.track !== undefined && object.track !== null) {
      message.track = TrackInfo.fromPartial(object.track);
    } else {
      message.track = undefined;
    }
    return message;
  },
  toJSON(message: TrackPublishedResponse): unknown {
    const obj: any = {};
    message.cid !== undefined && (obj.cid = message.cid);
    message.track !== undefined && (obj.track = message.track ? TrackInfo.toJSON(message.track) : undefined);
    return obj;
  },
};

export const SessionDescription = {
  encode(message: SessionDescription, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.type);
    writer.uint32(18).string(message.sdp);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SessionDescription {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSessionDescription } as SessionDescription;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.sdp = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SessionDescription {
    const message = { ...baseSessionDescription } as SessionDescription;
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = "";
    }
    if (object.sdp !== undefined && object.sdp !== null) {
      message.sdp = String(object.sdp);
    } else {
      message.sdp = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<SessionDescription>): SessionDescription {
    const message = { ...baseSessionDescription } as SessionDescription;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = "";
    }
    if (object.sdp !== undefined && object.sdp !== null) {
      message.sdp = object.sdp;
    } else {
      message.sdp = "";
    }
    return message;
  },
  toJSON(message: SessionDescription): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.sdp !== undefined && (obj.sdp = message.sdp);
    return obj;
  },
};

export const ParticipantUpdate = {
  encode(message: ParticipantUpdate, writer: Writer = Writer.create()): Writer {
    for (const v of message.participants) {
      ParticipantInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ParticipantUpdate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParticipantUpdate } as ParticipantUpdate;
    message.participants = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.participants.push(ParticipantInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ParticipantUpdate {
    const message = { ...baseParticipantUpdate } as ParticipantUpdate;
    message.participants = [];
    if (object.participants !== undefined && object.participants !== null) {
      for (const e of object.participants) {
        message.participants.push(ParticipantInfo.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ParticipantUpdate>): ParticipantUpdate {
    const message = { ...baseParticipantUpdate } as ParticipantUpdate;
    message.participants = [];
    if (object.participants !== undefined && object.participants !== null) {
      for (const e of object.participants) {
        message.participants.push(ParticipantInfo.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: ParticipantUpdate): unknown {
    const obj: any = {};
    if (message.participants) {
      obj.participants = message.participants.map(e => e ? ParticipantInfo.toJSON(e) : undefined);
    } else {
      obj.participants = [];
    }
    return obj;
  },
};

export const ActiveSpeakerUpdate = {
  encode(message: ActiveSpeakerUpdate, writer: Writer = Writer.create()): Writer {
    for (const v of message.speakers) {
      SpeakerInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ActiveSpeakerUpdate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseActiveSpeakerUpdate } as ActiveSpeakerUpdate;
    message.speakers = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.speakers.push(SpeakerInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ActiveSpeakerUpdate {
    const message = { ...baseActiveSpeakerUpdate } as ActiveSpeakerUpdate;
    message.speakers = [];
    if (object.speakers !== undefined && object.speakers !== null) {
      for (const e of object.speakers) {
        message.speakers.push(SpeakerInfo.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ActiveSpeakerUpdate>): ActiveSpeakerUpdate {
    const message = { ...baseActiveSpeakerUpdate } as ActiveSpeakerUpdate;
    message.speakers = [];
    if (object.speakers !== undefined && object.speakers !== null) {
      for (const e of object.speakers) {
        message.speakers.push(SpeakerInfo.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: ActiveSpeakerUpdate): unknown {
    const obj: any = {};
    if (message.speakers) {
      obj.speakers = message.speakers.map(e => e ? SpeakerInfo.toJSON(e) : undefined);
    } else {
      obj.speakers = [];
    }
    return obj;
  },
};

export const SpeakerInfo = {
  encode(message: SpeakerInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.sid);
    writer.uint32(21).float(message.level);
    writer.uint32(24).bool(message.active);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SpeakerInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSpeakerInfo } as SpeakerInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sid = reader.string();
          break;
        case 2:
          message.level = reader.float();
          break;
        case 3:
          message.active = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SpeakerInfo {
    const message = { ...baseSpeakerInfo } as SpeakerInfo;
    if (object.sid !== undefined && object.sid !== null) {
      message.sid = String(object.sid);
    } else {
      message.sid = "";
    }
    if (object.level !== undefined && object.level !== null) {
      message.level = Number(object.level);
    } else {
      message.level = 0;
    }
    if (object.active !== undefined && object.active !== null) {
      message.active = Boolean(object.active);
    } else {
      message.active = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<SpeakerInfo>): SpeakerInfo {
    const message = { ...baseSpeakerInfo } as SpeakerInfo;
    if (object.sid !== undefined && object.sid !== null) {
      message.sid = object.sid;
    } else {
      message.sid = "";
    }
    if (object.level !== undefined && object.level !== null) {
      message.level = object.level;
    } else {
      message.level = 0;
    }
    if (object.active !== undefined && object.active !== null) {
      message.active = object.active;
    } else {
      message.active = false;
    }
    return message;
  },
  toJSON(message: SpeakerInfo): unknown {
    const obj: any = {};
    message.sid !== undefined && (obj.sid = message.sid);
    message.level !== undefined && (obj.level = message.level);
    message.active !== undefined && (obj.active = message.active);
    return obj;
  },
};

export const UpdateSubscription = {
  encode(message: UpdateSubscription, writer: Writer = Writer.create()): Writer {
    for (const v of message.trackSids) {
      writer.uint32(10).string(v!);
    }
    writer.uint32(16).bool(message.subscribe);
    writer.uint32(32).int32(message.quality);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): UpdateSubscription {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateSubscription } as UpdateSubscription;
    message.trackSids = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.trackSids.push(reader.string());
          break;
        case 2:
          message.subscribe = reader.bool();
          break;
        case 4:
          message.quality = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): UpdateSubscription {
    const message = { ...baseUpdateSubscription } as UpdateSubscription;
    message.trackSids = [];
    if (object.trackSids !== undefined && object.trackSids !== null) {
      for (const e of object.trackSids) {
        message.trackSids.push(String(e));
      }
    }
    if (object.subscribe !== undefined && object.subscribe !== null) {
      message.subscribe = Boolean(object.subscribe);
    } else {
      message.subscribe = false;
    }
    if (object.quality !== undefined && object.quality !== null) {
      message.quality = videoQualityFromJSON(object.quality);
    } else {
      message.quality = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<UpdateSubscription>): UpdateSubscription {
    const message = { ...baseUpdateSubscription } as UpdateSubscription;
    message.trackSids = [];
    if (object.trackSids !== undefined && object.trackSids !== null) {
      for (const e of object.trackSids) {
        message.trackSids.push(e);
      }
    }
    if (object.subscribe !== undefined && object.subscribe !== null) {
      message.subscribe = object.subscribe;
    } else {
      message.subscribe = false;
    }
    if (object.quality !== undefined && object.quality !== null) {
      message.quality = object.quality;
    } else {
      message.quality = 0;
    }
    return message;
  },
  toJSON(message: UpdateSubscription): unknown {
    const obj: any = {};
    if (message.trackSids) {
      obj.trackSids = message.trackSids.map(e => e);
    } else {
      obj.trackSids = [];
    }
    message.subscribe !== undefined && (obj.subscribe = message.subscribe);
    message.quality !== undefined && (obj.quality = videoQualityToJSON(message.quality));
    return obj;
  },
};

export const UpdateTrackSettings = {
  encode(message: UpdateTrackSettings, writer: Writer = Writer.create()): Writer {
    for (const v of message.trackSids) {
      writer.uint32(10).string(v!);
    }
    writer.uint32(24).bool(message.disabled);
    writer.uint32(32).int32(message.quality);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): UpdateTrackSettings {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateTrackSettings } as UpdateTrackSettings;
    message.trackSids = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.trackSids.push(reader.string());
          break;
        case 3:
          message.disabled = reader.bool();
          break;
        case 4:
          message.quality = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): UpdateTrackSettings {
    const message = { ...baseUpdateTrackSettings } as UpdateTrackSettings;
    message.trackSids = [];
    if (object.trackSids !== undefined && object.trackSids !== null) {
      for (const e of object.trackSids) {
        message.trackSids.push(String(e));
      }
    }
    if (object.disabled !== undefined && object.disabled !== null) {
      message.disabled = Boolean(object.disabled);
    } else {
      message.disabled = false;
    }
    if (object.quality !== undefined && object.quality !== null) {
      message.quality = videoQualityFromJSON(object.quality);
    } else {
      message.quality = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<UpdateTrackSettings>): UpdateTrackSettings {
    const message = { ...baseUpdateTrackSettings } as UpdateTrackSettings;
    message.trackSids = [];
    if (object.trackSids !== undefined && object.trackSids !== null) {
      for (const e of object.trackSids) {
        message.trackSids.push(e);
      }
    }
    if (object.disabled !== undefined && object.disabled !== null) {
      message.disabled = object.disabled;
    } else {
      message.disabled = false;
    }
    if (object.quality !== undefined && object.quality !== null) {
      message.quality = object.quality;
    } else {
      message.quality = 0;
    }
    return message;
  },
  toJSON(message: UpdateTrackSettings): unknown {
    const obj: any = {};
    if (message.trackSids) {
      obj.trackSids = message.trackSids.map(e => e);
    } else {
      obj.trackSids = [];
    }
    message.disabled !== undefined && (obj.disabled = message.disabled);
    message.quality !== undefined && (obj.quality = videoQualityToJSON(message.quality));
    return obj;
  },
};

export const ICEServer = {
  encode(message: ICEServer, writer: Writer = Writer.create()): Writer {
    for (const v of message.urls) {
      writer.uint32(10).string(v!);
    }
    writer.uint32(18).string(message.username);
    writer.uint32(26).string(message.credential);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ICEServer {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseICEServer } as ICEServer;
    message.urls = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.urls.push(reader.string());
          break;
        case 2:
          message.username = reader.string();
          break;
        case 3:
          message.credential = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ICEServer {
    const message = { ...baseICEServer } as ICEServer;
    message.urls = [];
    if (object.urls !== undefined && object.urls !== null) {
      for (const e of object.urls) {
        message.urls.push(String(e));
      }
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = String(object.username);
    } else {
      message.username = "";
    }
    if (object.credential !== undefined && object.credential !== null) {
      message.credential = String(object.credential);
    } else {
      message.credential = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<ICEServer>): ICEServer {
    const message = { ...baseICEServer } as ICEServer;
    message.urls = [];
    if (object.urls !== undefined && object.urls !== null) {
      for (const e of object.urls) {
        message.urls.push(e);
      }
    }
    if (object.username !== undefined && object.username !== null) {
      message.username = object.username;
    } else {
      message.username = "";
    }
    if (object.credential !== undefined && object.credential !== null) {
      message.credential = object.credential;
    } else {
      message.credential = "";
    }
    return message;
  },
  toJSON(message: ICEServer): unknown {
    const obj: any = {};
    if (message.urls) {
      obj.urls = message.urls.map(e => e);
    } else {
      obj.urls = [];
    }
    message.username !== undefined && (obj.username = message.username);
    message.credential !== undefined && (obj.credential = message.credential);
    return obj;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;