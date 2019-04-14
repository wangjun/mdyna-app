import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import Filter from 'grommet/components/icons/base/Filter';
import Brush from 'grommet/components/icons/base/Brush';
import FormNext from 'grommet/components/icons/base/FormNext';
import FormPrevious from 'grommet/components/icons/base/FormPrevious';
import SearchIcon from 'grommet/components/icons/base/Search';
import Pulse from 'grommet/components/icons/base/Add';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import Search from 'grommet/components/Search';
import Button from 'grommet/components/Button';
import classnames from 'classnames';
import Label from 'grommet/components/Label';
import Image from 'grommet/components/Image';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Tooltip from 'UI/Tooltip';
import TooltipData from 'UI/tooltips.json';
import LabelFilter from 'UI/LabelFilter';

import logo from '../../resources/MdynaLogoCircle.png';

import './Sidebar.scss'; // eslint-disable-line

function getCardTitles(cards) {
  return (cards && cards.map(d => d && d.title)) || '';
}
class Sidebar extends Component {
  state = {
    searchInput: '',
  };

  searchBar = React.createRef();

  expandMenu() {
    const { toggleSidebar } = this.props;

    toggleSidebar();
  }

  render() {
    const {
      cards,
      whiteMode,
      labelFilters,
      addLabelFilter,
      removeLabelFilter,
      sidebarExpanded,
      toggleSidebar,
      toggleWhiteMode,
      toggleEditor,
      toggleCompletedFilter,
      completedFilterOn,
      labels,
      searchCards,
    } = this.props;
    const { searchInput } = this.state;
    const labelFilterFuncs = { addLabelFilter, removeLabelFilter };
    const titles = [...getCardTitles(cards)];

    return (
      <Box
        full="vertical"
        justify="start"
        className={classnames('sidebar', {
          'white-mode': whiteMode,
          collapsed: !sidebarExpanded,
        })}
        pad="small"
        direction="column"
      >
        <KeyboardEventHandler
          handleKeys={['ctrl+p']}
          onKeyEvent={() => {
            if (!sidebarExpanded) {
              this.expandMenu();
            }
            setTimeout(() => this.searchBar.current.focus(), 300);
          }}
        />
        <Box direction="row" justify="start" className="menu-item title">
          {sidebarExpanded ? (
            <Button onClick={() => toggleSidebar()} className="title-button">
              <FormPrevious />
              <Image src={logo} className="sidebar-app-logo" alt="Mdyna" size="small" />
              <Label size="large">mdyna</Label>
            </Button>
          ) : (
            <Button onClick={() => toggleSidebar()} className="title-button">
              <FormNext />
            </Button>
          )}
        </Box>
        <Box direction="row" justify="start" className="menu-item">
          {sidebarExpanded ? (
            <Search
              inline
              suggestions={titles.filter(
                d => d && d.toLowerCase().startsWith(searchInput.toLowerCase()),
              )}
              onDOMChange={(e) => {
                searchCards(e.target.value);
                this.setState({
                  searchInput: e.target.value,
                });
              }}
              ref={this.searchBar}
              onSelect={e => searchCards(e.suggestion)}
              value={searchInput}
            />
          ) : (
            <Button
              onClick={() => {
                this.expandMenu();
                setTimeout(() => this.searchBar.current.focus(), 300);
              }}
            >
              <SearchIcon />
            </Button>
          )}
        </Box>

        <Box direction="row" justify="start" className="menu-item">
          <Button
            onClick={() => {
              toggleWhiteMode(!whiteMode);
            }}
            className="white-mode-button"
          >
            <Brush />
            {sidebarExpanded ? (
              <Label className="menu-label">{whiteMode ? 'Dark Theme' : 'Light Theme'}</Label>
            ) : (
              ''
            )}
          </Button>
        </Box>
        <Box direction="row" justify="start" className="menu-item">
          <Button
            onClick={() => {
              toggleEditor(true);
            }}
            className="add-note-btn"
          >
            <Pulse />
            {sidebarExpanded ? <Label className="menu-label">Add Card</Label> : ''}
          </Button>
        </Box>
        <Box direction="row" justify="start" className="menu-item">
          <Button
            onClick={() => {
              toggleCompletedFilter(!completedFilterOn);
            }}
            className={classnames('toggle-completed-button', {
              active: completedFilterOn,
            })}
          >
            <CheckmarkIcon />
            {sidebarExpanded ? <Label className="menu-label">Toggle Completed</Label> : ''}
          </Button>
        </Box>

        <Box direction="column" className="menu-item-labels">
          <Box direction="row" justify="start" className="menu-item">
            {sidebarExpanded ? (
              <React.Fragment>
                <Filter />
                <Label className="menu-label">Filter Labels</Label>
              </React.Fragment>
            ) : (
              <Button
                onClick={() => {
                  this.expandMenu();
                }}
              >
                <Filter />
              </Button>
            )}
          </Box>
          {sidebarExpanded ? (
            <LabelFilter
              whiteMode={whiteMode}
              labels={labels}
              labelFilters={labelFilters}
              labelFilterFuncs={labelFilterFuncs}
            />
          ) : (
            ''
          )}
        </Box>

        {sidebarExpanded && (
          <Box className="sidebar-footer">
            <Label size="small">
              Markdown Guide
              <Tooltip
                whiteMode={whiteMode}
                text={TooltipData.markdown.text}
                title={TooltipData.markdown.title}
              />
            </Label>
            <Label size="small">
              Keyboard Shortcuts
              <Tooltip
                whiteMode={whiteMode}
                text={TooltipData.keyboard.text}
                title={TooltipData.keyboard.title}
              />
            </Label>
            <Label size="small">{window.appVersion}</Label>
          </Box>
        )}
      </Box>
    );
  }
}

Sidebar.propTypes = {
  labelFilters: PropTypes.array.isRequired,
  addLabelFilter: PropTypes.func.isRequired,
  toggleCompletedFilter: PropTypes.func.isRequired,
  sidebarExpanded: PropTypes.bool,
  completedFilterOn: PropTypes.bool,
  toggleSidebar: PropTypes.func.isRequired,
  removeLabelFilter: PropTypes.func.isRequired,
  toggleWhiteMode: PropTypes.func.isRequired,
  toggleEditor: PropTypes.func.isRequired,
  searchCards: PropTypes.func.isRequired,
  whiteMode: PropTypes.bool,
  labels: PropTypes.array,
  cards: PropTypes.array.isRequired,
};

Sidebar.defaultProps = {
  whiteMode: false,
  sidebarExpanded: false,
  completedFilterOn: false,
  labels: [],
};

export default Sidebar;
