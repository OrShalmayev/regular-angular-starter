export enum LoadingState {
    Init = 'init',
    Loading = 'loading',
    Loaded = 'loaded',
    Failed = 'failed'
}

export type CallState = LoadingState;

export type NamedCallStateSlice<Collection extends string> = {
    [K in Collection as `${K}CallState`]: CallState;
};

export type CallStateSlice = {
    callState: CallState;
};

export function withCallState<Collection extends string, CollectionData = unknown>(config: {
    collection: Collection, collectionData: CollectionData
}) {
    return {
        [config.collection]:               config.collectionData,
        [`${config.collection}CallState`]: LoadingState.Init,
    };
}

export function setLoading<Prop extends string>(prop?: Prop): NamedCallStateSlice<Prop> | CallStateSlice {
    if (prop) {
        return {[`${prop}CallState`]: LoadingState.Loading} as NamedCallStateSlice<Prop>;
    }

    return {callState: LoadingState.Loading};
}

export function setLoaded<Prop extends string>(prop?: Prop): NamedCallStateSlice<Prop> | CallStateSlice {
    if (prop) {
        return {[`${prop}CallState`]: LoadingState.Loaded} as NamedCallStateSlice<Prop>;
    }
    else {
        return {callState: LoadingState.Loaded};
    }
}

export function setError<Prop extends string>(error: string, prop?: Prop): NamedCallStateSlice<Prop> | CallStateSlice {
    if (prop) {
        return {[`${prop}CallState`]: LoadingState.Failed} as NamedCallStateSlice<Prop>;
    }
    else {
        return {callState: LoadingState.Failed};
    }
}
