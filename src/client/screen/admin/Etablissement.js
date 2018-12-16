// @flow
import React from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Form from '../../component/Form';
import { fetchAPI } from '../../utils/apiManager';
import { Action, ETABLISSEMENT_FORM_CHANGE, SNACKBAR_DISPATCH } from '../../reducer/action';
import store from '../../utils/store';

const reducer = 'etablissement';

class Etablissement extends React.PureComponent {
  async componentDidMount() {
    const { fetchEtablissement, setForm } = this.props;
    await fetchEtablissement();
  }

  onSubmit = async () => {
    const {
      updateEtablissement, _id, form, history,
    } = this.props;
    await updateEtablissement({
      _id,
      ...form,
    });
    history.push('/etablissements');
  }

  props: {
    classes: Object,
    history: Object,
    children: ?any,
    form: Object,
    _id: string,
    byId: Object,
    fetchEtablissement: Function,
    updateEtablissement: Function,
}

  render() {
    const {
      classes,
      form,
    } = this.props;
    if (!form) {
      return null;
    }
    return (
      <div className={classes.root}>
        <Form
          reducer={reducer}
          onSubmit={this.onSubmit}
          form={form}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ etablissement: { byId, form } }, ownProps) => ({
  ...ownProps,
  _id: ownProps.match.params.id,
  form: byId[ownProps.match.params.id] && form,
  byId,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchEtablissement: () => fetchAPI(reducer, {
    _id: ownProps.match.params.id,
  }).then((res) => {
    console.info(res);
    const form = res[0];
    console.info(form);
    const { name, agents, address } = form;
    dispatch(new Action(
      ETABLISSEMENT_FORM_CHANGE,
      { name: 'name', value: name },
    ));
    dispatch(new Action(
      ETABLISSEMENT_FORM_CHANGE,
      { name: 'agents', value: agents },
    ));
    dispatch(new Action(
      ETABLISSEMENT_FORM_CHANGE,
      { name: 'address', value: address },
    ));
  }),

  updateEtablissement: async selector => fetchAPI(reducer, selector, 'update')
    .then(() => fetchAPI(reducer, { _id: ownProps.match.params.id }))
    .then(() => {
      dispatch(new Action(SNACKBAR_DISPATCH, { variant: 'info', text: 'Modifications enregistrées' }));
      return new Promise(res => setTimeout(res, 1000));
    }),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(theme => ({
  root: {

  },
}))(Etablissement)));
