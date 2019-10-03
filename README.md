# Challenge 06. Application with React Native

In this challenge you will add new functionality to the application we developed throughout this module.

## Functionalities

### Loading from Repositories

Add a loading indicator using `<ActivityIndicator />` before loading the list of favorite repositories in the User details screen.

### Infinite Scroll

Add infinite scroll functionality to the list of favorite repositories. Once the user reaches the ** 20% ** end of the list, look for items on the next page and add to the list. Your code will look as follows:

`` js
<Stars
  onEndReachedThreshold = {0.2} // Load more items when it reaches 20% of end
  onEndReached = {this.loadMore} // Function that loads more items
  // Remaining Proposals
>
`` `

To request a new page in Github use a `page` parameter at the end of the URL:

`` `
https://api.github.com/users/diego3g/starred?page=2
`` `

### Pull to Refresh

Add a feature when dragging the list of favorite repositories down to refresh the list by resetting the status, ie return the paging state to page 1 displaying only the first 30 items.

Pull to Refresh functionality exists by default in FlatList and can be implemented through the following code:

`` js
<Stars
  onRefresh = {this.refreshList} // Function triggers when user drags down list
  refreshing = {this.state.refreshing} // Variable that stores a true / false state that represents whether the list is updating
  // Remaining Proposals
>
`` `

### WebView

Create a new page in the application that will be accessed when the user clicks on a favorite repository, this page should contain only the application's Header. The page content will be a WebView, ie an integrated browser that displays the `html_url` attribute present in the repository object that comes from the Github API.

WebView Usage Documentation: https://github.com/react-native-community/react-native-webview/blob/master/docs/Getting-Started.md

Code Example:

`` js
<WebView
  source = {{uri: repository.html_url}}
  style = {{flex: 1}}
/>
`` `
