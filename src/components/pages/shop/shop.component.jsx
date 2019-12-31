import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../../collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import {firestore, convertCollectionsSnapshotToMap} from '../../../firebase/firebase.utils';
import {updateCollections} from '../../../redux/shop/shop.actions';
import WithSpinner from '../../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
    state = {
        loading: true
    };
  unsubscribeFromSnapshot = null;
  componentDidMount() {
      const {updateCollections} = this.props;
      const collectionRef = firestore.collection('collections');
    //   collectionRef.onSnapshot(async snapshot => {
    //    const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //    updateCollections(collectionsMap);
    //    this.setState({loading: false});
    //   })

    collectionRef.get().then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
        this.setState({loading: false});
       });

  }

    render() {
        const {match} = this.props;
        const {loading} = this.state;
        return( 
            <div className='shop-page'>
             {/* <Route exact path={`${match.path}`} component={CollectionsOverview} />       */}
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isloading={loading} {...props} />} />      
                {/* <Route path={`${match.path}/:collectionId`} component={CollectionPage} />       */}
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isloading={loading} {...props} />} />      
             </div>
            )
    }
}  

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})
    export default connect(null, mapDispatchToProps)(ShopPage);

