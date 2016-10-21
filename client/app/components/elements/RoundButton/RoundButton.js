import { div } from 'r-dom';
import classNames from 'classnames';

import css from './RoundButton.css';

export default function RoundButton({ diameter, content, className }) {
  return div({ className: classNames(className, css.roundButton), style: { height: diameter, width: diameter } }, content);
}

export const ArrowButton = ({ diameter, className, direction }) =>
  div({
    className: classNames(className, css.arrowButton, css.roundButton),
    style: {
      height: diameter,
      width: diameter,
      [direction === 'left' ? 'padding-right' : 'padding-left']: '1px', // centering, the glyphs are offset
    },
  }, direction === 'left' ? '‹' : '›');
