import { connect } from 'react-redux';
import CardItem from '../components/Cards/CardItem';
import {
  removeCard,
  toggleCard,
  editCard,
  addLabel,
  removeLabel,
  changeCardSetting,
  changeTitle,
  saveCard,
  addLabelFilter,
  removeLabelFilter,
} from '../store/actions';

function mapDispatchToProps(dispatch) {
  return {
    removeCard: (card) => {
      dispatch(removeCard(card));
    },
    editCard: (card) => {
      dispatch(editCard(card));
    },
    toggleCard: (card) => {
      dispatch(toggleCard(card));
    },
    changeCardSetting: (prop, value) => {
      dispatch(changeCardSetting(prop, value));
    },
    saveCard: (card) => {
      dispatch(saveCard(card));
    },
    changeTitle: (card, title) => {
      dispatch(changeTitle(card, title));
    },
    addLabel: (val) => {
      dispatch(addLabel(val));
    },
    removeLabel: (val) => {
      dispatch(removeLabel(val));
    },
    addLabelFilter: (val) => {
      dispatch(addLabelFilter(val));
    },
    removeLabelFilter: (val) => {
      dispatch(removeLabelFilter(val));
    },
  };
}

function mapStateToProps(state) {
  return { whiteMode: state.style.whiteMode, labelFilters: state.filters.labelFilters };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardItem);
