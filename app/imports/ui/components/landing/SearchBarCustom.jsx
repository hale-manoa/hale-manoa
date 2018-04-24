import PropTypes from 'prop-types'
import React from 'react'
import { Search } from 'semantic-ui-react'

import SearchBar from './SearchBar'
import { NavLink } from 'react-router-dom';

const resultRenderer = ({ firstName, lastName, type, age, propertytype, description, image, _id }) => {
  if(propertytype)
  return (
      <Search.Result
          //as={NavLink} activeClassName="" exact to={_id}
          as={NavLink} activeClassName="" exact to={"/list"}
          title={propertytype}
          image={image}
          description={description}
      >
      </Search.Result>
  )
  else if(firstName)
    return (
        <Search.Result
            //as={NavLink} activeClassName="" exact to={_id}
            as={NavLink} activeClassName="" exact to={`/profile/${_id}`}
            title={firstName+" "+lastName}
            image={image}
            description={type + "    Age: "+ age}
        >
        </Search.Result>
    )
}

resultRenderer.propTypes = {
  propertytype: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  _id: PropTypes.string,
};

const SearchBarCustom = () => (
    <SearchBar resultRenderer={resultRenderer}/>
);

export default SearchBarCustom