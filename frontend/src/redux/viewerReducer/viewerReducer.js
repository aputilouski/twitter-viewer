import actions from "./viewerActions";


let initialState = {
    tweets: [],
    tweetsAmount: 0,
    pageSize: 0,
    history: ['NASA360', 'SPACEdotcom', 'SpaceX'],
    isLoading: false,
    inputValue: {},
    mediaArea: {},
    currentPage: 1,
}


const ViewerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.set_tweets: {
            return {
                ...state,
                tweets: action.tweets.length ? [...action.tweets] : [],
                tweetsAmount: action.amount,
                pageSize: action.page_size,
                isLoading: false,
            };
        }
        case actions.loading_tweets: {
            return {
                ...state,
                isLoading: action.status,
            };
        }
        case actions.add_history_item: {
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
        case actions.remove_history_item: {
            return {
                ...state,
                history: state.history.filter(function(item) {
                    return item !== action.item
                })
            };
        }
        case actions.set_input_value: {
            return {
                ...state,
                inputValue: {username: action.input},
            };
        }
        case actions.set_media_area_data: {
            return {
                ...state,
                mediaArea: {media: action.media},
            };
        }
        case actions.set_current_page: {
            return {
                ...state,
                currentPage: action.value,
            };
        }
        default:
            return state;
    }
}


export default ViewerReducer;