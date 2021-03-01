import {tweetsAPI} from "../api/tweets-api";

const SET_TWEETS = 'SET_TWEETS';
const LOADING_TWEETS = 'LOADING_TWEETS';
const ADD_HISTORY_ITEM = 'ADD_HISTORY_ITEM';
const REMOVE_HISTORY_ITEM = 'REMOVE_HISTORY_ITEM';
const SET_INPUT_VALUE = 'SET_INPUT_VALUE';
const SET_MEDIA_AREA_DATA = 'SET_MEDIA_AREA_DATA';

let initialState = {
    tweets: [],
    history: ['belteanews', 'OnlinerBY', 'tutby'],
    isLoading: false,
    inputValue: {},
    mediaArea: {}
}

const TwitterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TWEETS: {
            return {
                ...state,
                tweets: [...action.tweets],
                isLoading: false,
            };
        }
        case LOADING_TWEETS: {
            return {
                ...state,
                isLoading: action.status,
            };
        }
        case ADD_HISTORY_ITEM: {
            let newHistory = state.history;
            if(action.item?.length > 0) {
                newHistory.push(action.item)
            }
            return {
                ...state,
                history: newHistory.filter(function(item, pos) {
                    return newHistory.indexOf(item) === pos;
                })
            };
        }
        case REMOVE_HISTORY_ITEM: {
            return {
                ...state,
                history: state.history.filter(function(item) {
                    return item !== action.item
                })
            };
        }
        case SET_INPUT_VALUE: {
            return {
                ...state,
                inputValue: {username: action.input},
            };
        }
        case SET_MEDIA_AREA_DATA: {
            return {
                ...state,
                mediaArea: {media: action.media},
            };
        }
        default:
            return state;
    }
}

export const setTweetsActionCreator = (tweets) => ({type: SET_TWEETS, tweets})
export const setLoadingStatus = (status) => ({type: LOADING_TWEETS, status})
export const addHistoryItem = (item) => ({type: ADD_HISTORY_ITEM, item})
export const removeHistoryItem = (item) => ({type: REMOVE_HISTORY_ITEM, item})
export const setInputValue = (input) => ({type: SET_INPUT_VALUE, input})
export const setMediaAriaData = (media) => ({type: SET_MEDIA_AREA_DATA, media})


export const getTweetsTHUNK = (currentPage, input) => async (dispatch) => {
    let response = await tweetsAPI.getTweets(currentPage, input);
    let tweets = response;

    dispatch(setTweetsActionCreator(tweets));
    dispatch(addHistoryItem(input));
}


export default TwitterReducer;