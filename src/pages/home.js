import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Scream from "../components/scream/Scream02";
import Profile from "../components/profile/Profile";
import ScreamSkeleton from "../util/ScreamSkeleton";

import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    // axios
    //   .get("/screams")
    //   .then(res => {
    //     //console.log(res.data);
    //     this.setState({
    //       screams: res.data
    //     });
    //   })
    //   .catch(err => console.log(err)); //after using redux, not use this anymore
    this.props.getScreams(); // use this instead
  }
  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      //<p>Loading...</p> //ganti sdgn Skeleton
      <ScreamSkeleton />
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getScreams }
)(home);
