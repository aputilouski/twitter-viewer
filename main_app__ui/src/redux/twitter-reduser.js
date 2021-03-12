import {tweetsAPI} from "../api/tweets-api";
import {setAlertZoneActionCreator, setErrorMessage} from "./app-reduser";

const SET_TWEETS = 'SET_TWEETS';
const LOADING_TWEETS = 'LOADING_TWEETS';
const ADD_HISTORY_ITEM = 'ADD_HISTORY_ITEM';
const REMOVE_HISTORY_ITEM = 'REMOVE_HISTORY_ITEM';
const SET_INPUT_VALUE = 'SET_INPUT_VALUE';
const SET_MEDIA_AREA_DATA = 'SET_MEDIA_AREA_DATA';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

let initialState = {
    tweets: [],
    tweetsAmount: 0,
    pageSize: 0,
    history: ['belteanews', 'OnlinerBY', 'tutby'],
    isLoading: false,
    inputValue: {},
    mediaArea: {},
    currentPage: 1,
}

const TwitterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TWEETS: {
            return {
                ...state,
                tweets: action.tweets.length ? [...action.tweets] : [],
                tweetsAmount: action.amount,
                pageSize: action.page_size,
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
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.value,
            };
        }
        default:
            return state;
    }
}

export const setTweetsActionCreator = ({tweets, amount, page_size}) => ({type: SET_TWEETS, tweets, amount, page_size})
export const clearTweets = () => ({ tweets: [], amount: 0, page_size: 0})
export const setLoadingStatus = (status) => ({type: LOADING_TWEETS, status})
export const addHistoryItem = (item) => ({type: ADD_HISTORY_ITEM, item})
export const removeHistoryItem = (item) => ({type: REMOVE_HISTORY_ITEM, item})
export const setInputValue = (input) => ({type: SET_INPUT_VALUE, input})
export const setMediaAriaData = (media) => ({type: SET_MEDIA_AREA_DATA, media})
export const setCurrentPage = (value) => ({type: SET_CURRENT_PAGE, value})


export const getTweetsTHUNK = (currentPage, input) => (dispatch) => {
   return tweetsAPI.getTweets(currentPage, input).then(response => {
       dispatch(setTweetsActionCreator(response.data));
       dispatch(addHistoryItem(input));
    }).catch(function(error) {
       dispatch(setAlertZoneActionCreator(setErrorMessage(error.response.data?.message || error.message)));
       dispatch(setTweetsActionCreator(clearTweets()));
    });
}


export default TwitterReducer;