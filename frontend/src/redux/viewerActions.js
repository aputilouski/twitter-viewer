const actions = {
    set_tweets: 'SET_TWEETS',
    loading_tweets: 'LOADING_TWEETS',
    add_history_item: 'ADD_HISTORY_ITEM',
    remove_history_item: 'REMOVE_HISTORY_ITEM',
    set_input_value: 'SET_INPUT_VALUE',
    set_media_area_data: 'SET_MEDIA_AREA_DATA',
    set_current_page: 'SET_CURRENT_PAGE',


    __create_action: {
        setTweets: ({tweets, amount, page_size}) => ({type: actions.set_tweets, tweets, amount, page_size}),
        clearTweets: () => ({type: actions.set_tweets, tweets: [], amount: 0, page_size: 0}),
        setLoadingStatus: (status) => ({type: actions.loading_tweets, status}),
        addHistoryItem: (item) => ({type: actions.add_history_item, item}),
        removeHistoryItem: (item) => ({type: actions.remove_history_item, item}),
        setInputValue: (input) => ({type: actions.set_input_value, input}),
        setMediaAriaData: (media) => ({type: actions.set_media_area_data, media}),
        setCurrentPage: (value) => ({type: actions.set_current_page, value}),
    }
}


export default actions;