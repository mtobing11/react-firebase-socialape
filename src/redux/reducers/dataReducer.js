import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: actions.payload,
        loading: false
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: actions.payload
      };
    case DELETE_SCREAM:
      let index = state.screams.findIndex(
        scream => scream.screamId === actions.payload
      );
      state.screams.splice(index, 1);
      return {
        ...state
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [actions.payload, ...state.screams]
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index2 = state.screams.findIndex(
        scream => scream.screamId === actions.payload.screamId
      );
      state.screams[index2] = actions.payload;
      if (state.scream.screamId === actions.payload.screamId) {
        state.scream = actions.payload;
      }
      return {
        ...state
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [actions.payload, ...state.scream.comments]
        }
      };

    default:
      return state;
  }
}
