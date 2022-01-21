const Media = {
    state: {
        itemsSelectedCount: 0,
        stateMediaModal: false,
        previewImages: false,
        previewVideos: false,
        imageSelected: {},
        videoSelected: {},
        mainArticlePhoto: {},
        setContentCardImage: '',
        setContentCardGallery: '',
        setContentCardVideo: '',
        setContentCardImageAds: '',
        selectedType: '',
        previewItemAction: true,
        galleryMode: false,
        imageAndVideo: false,
    },
    mutations: {
        // Reset Media Type
        resetType(state){
            state.previewImages = false
            state.previewVideos = false
            state.galleryMode = false
            state.previewItemAction = true
            state.imageAndVideo = false
        },
        resetPostData(state){
            state.mainArticlePhoto = {}
        },
        // Open Global Media
        openMediaModal(state) {
            this.commit('resetType')
            state.stateMediaModal = !state.stateMediaModal
        },
        // Open Media And Preview All Images
        openMediaImage(state, type = null) {
            this.commit('resetType')
            state.stateMediaModal = !state.stateMediaModal
            state.previewImages = true
            state.previewItemAction = false
            state.selectedType = type
        },
        // Open Media And Preview All Images
        openMediaImageFromPosts(state, type = '') {
            this.commit('resetType')
            state.selectedType = type
            state.stateMediaModal = !state.stateMediaModal
            state.previewImages = true
            state.previewItemAction = false
        },
        // Open Media And Preview All Images
        openMediaAdsFromPosts(state, type = '') {
            this.commit('resetType')
            state.selectedType = type
            state.stateMediaModal = !state.stateMediaModal
            state.previewImages = true
            state.previewItemAction = false
        },
        // Open Media And Preview All Images And All Videos
        openMediaImageAndVideo(state, type = '') {
            this.commit('resetType')
            state.selectedType = type
            state.stateMediaModal = !state.stateMediaModal
            state.imageAndVideo = true
            state.previewImages = true
            state.previewItemAction = false
        },
        // Open Media And Preview All Videos
        openMediaVideosFromPosts(state, type = '') {
            this.commit('resetType')
            state.selectedType = type
            state.stateMediaModal = !state.stateMediaModal
            state.previewVideos = true
            state.previewItemAction = false
        },
        // Open Media And Preview All Images
        openMediaGalleryFromPosts(state, type = '') {
            this.commit('resetType')
            state.selectedType = type
            state.stateMediaModal = !state.stateMediaModal
            state.previewImages = true
            state.galleryMode = true
        },
        closeMediaModal(state) {
            state.stateMediaModal = false
        },
        checkItemsSelected(state, count) {
            state.itemsSelectedCount = count
        },
        setItemSelected(state, item) {
            if(state.selectedType === 'mainArticlePhoto' ){
                state.mainArticlePhoto = item
                state.imageSelected = item
            }
            else if (state.selectedType === 'image'){
                state.imageSelected = item
            }
            else if (state.selectedType.type === 'cardImage'){
                state.setContentCardImage = {item: item, index: state.selectedType.index}
                state.imageSelected = item
            }
            else if (state.selectedType.type === 'cardAds'){
                state.setContentCardImageAds = {item: item, index: state.selectedType.index}
                state.imageSelected = item
            }
            else if (state.selectedType.type === 'cardGallery'){
                state.setContentCardGallery = {item: item, index: state.selectedType.index}
                state.imageSelected = item
            }
            else if (state.selectedType.type === 'cardVideo'){
                state.setContentCardVideo = {item: item, index: state.selectedType.index}
                state.videoSelected = item
            }
        }
    },
    actions: {

    },
    getters: {}
}

export default Media
