import { Component, PropTypes } from 'react';
import r, { div } from 'r-dom';
import Immutable from 'immutable';
import styleVariables from '../../../assets/styles/variables';
import { routes as routesProp } from '../../../utils/PropTypes';

import Topbar from '../../sections/Topbar/Topbar';
import ListingCard from '../../composites/ListingCard/ListingCard';
import ListingCardPanel from '../../composites/ListingCardPanel/ListingCardPanel';
import Branding from '../../composites/Branding/Branding';
import FlashNotification from '../../composites/FlashNotification/FlashNotification';

import css from './SearchPage.css';

const DEFAULT_CONTEXT = {
  marketplace_color1: styleVariables['--customColorFallback'],
};

const listingsByIds = (listings, ids) =>
  ids.map((id) => listings.get(id));

class SearchPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.listings = listingsByIds(props.searchPage.listings, props.searchPage.currentPage) || [];
    this.listingProps = this.listingProps.bind(this);
  }

  listingProps(listing, color) {
    const listingKey = listing.id.toString();
    return {
      key: `card_${listingKey}`,
      color,
      listing,
    };
  }

  render() {
    const { marketplace_color1: marketplaceColor1, displayBrandingInfo, linkToSharetribe } = { ...DEFAULT_CONTEXT, ...this.props.marketplace };
    const displayBranding = this.props.marketplace && displayBrandingInfo && linkToSharetribe;
    return div({ className: css.searchPage }, [
      r(Topbar, {
        ...this.props.topbar,
        routes: this.props.routes,
      }),
      r(ListingCardPanel,
        { className: css.listingContainer },
        this.listings.map((listing) =>
          r(ListingCard, this.listingProps(listing, marketplaceColor1))
      )),
      displayBranding ? r(Branding, { linkToSharetribe }) : null,
      r(FlashNotification, {
        actions: this.props.actions,
        messages: this.props.flashNotifications,
      }),
    ]);
  }
}

export const SearchPageModel = Immutable.Record({
  prevPage: new Immutable.List(),
  currentPage: new Immutable.List(),
  nextPage: new Immutable.List(),
  listings: new Immutable.List(),
});

const { bool, func, instanceOf, shape, string } = PropTypes;

SearchPage.propTypes = {
  actions: shape({
    removeFlashNotification: func.isRequired,
  }).isRequired,
  flashNotifications: instanceOf(Immutable.List).isRequired,
  searchPage: instanceOf(SearchPageModel).isRequired,
  marketplace: PropTypes.shape({
    marketplaceColor1: string,
    location: string,
    displayBrandingInfo: bool,
    linkToSharetribe: string,
  }),
  routes: routesProp,
  topbar: shape(Topbar.propTypes).isRequired,
};

export default SearchPage;
