/**
 *
 * LeftMenuFooter
 *
 */

import React from 'react';

import Wrapper from './Wrapper';

function LeftMenuFooter() {


  return (
    <Wrapper>
      <div className="poweredBy">
      <span>Desenvolvido Por &nbsp;</span>
        <a key="website" href="https://github.com/LudwigEdward" target="_blank" rel="noopener noreferrer">
        Luís Eduardo
        </a>
      </div>
    </Wrapper>
  );
}



export default LeftMenuFooter;
