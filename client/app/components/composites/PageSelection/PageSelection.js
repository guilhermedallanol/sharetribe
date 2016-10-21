import r, { div, a } from 'r-dom';
import { ArrowButton } from '../../elements/RoundButton/RoundButton';
import { upsertSearchQueryParam } from '../../../utils/url';

import css from './PageSelection.css';

export default function PageSelection({ currentPage, totalPages, location, pageParam }) {
  const hasNext = totalPages > currentPage;
  const hasPrev = currentPage > 1;

  const getLocation = (num) => {
    const newParams = upsertSearchQueryParam(location, pageParam, num);
    const locationBase = location.split('?')[0];
    return `${locationBase}?${newParams}`;
  };

  const setPage = (num) =>
    (e) => {
      e.preventDefault();

      // placeholder for page change without page load
      window.location = getLocation(num);
      return false;
    };

  return div({ className: css.pageSelection }, [
    `Page ${currentPage} of ${totalPages} `,
    div({ className: css.arrowButtons }, [
      hasPrev ? a({
        onClick: setPage(currentPage - 1),
        href: getLocation(currentPage - 1) },
        r(ArrowButton, { diameter: '36px', direction: 'left' })) : null,
      hasNext ? a({
        onClick: setPage(currentPage + 1),
        href: getLocation(currentPage + 1) },
        r(ArrowButton, { diameter: '36px', direction: 'right' })) : null,
    ]),
  ]);
}
