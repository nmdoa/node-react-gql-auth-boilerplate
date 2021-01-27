import React from 'react'

import './style.css'

const Pagination = ({ total, skip, limit, onPageChanged }) => {
    const pages = Math.ceil(total / limit)
    // const pages = 100;
    const currentPage = skip / limit + 1
    // const currentPage = skip/limit + 10;

    let pagesHtml = []
    let from = 1
    let to = pages

    if (pages > 5) {
        from = currentPage > 3 ? currentPage - 2 : 1
        to = currentPage < pages - 3 ? currentPage + 2 : pages
    }

    for (from; from <= to; from++) {
        const plink = from
        const className =
            plink === currentPage ? 'page-item active' : 'page-item'
        pagesHtml.push(
            <li key={plink} className={className}>
                <a className="page-link" onClick={() => onPageChanged(plink)}>
                    {plink}
                </a>
            </li>
        )
    }

    return (
        <nav aria-label="...">
            <ul className="pagination justify-content-end">
                <li className="page-item">
                    <span
                        className="page-link"
                        onClick={() => onPageChanged(1)}
                    >
                        First
                    </span>
                </li>
                {currentPage > 1?
                <li className="page-item">
                    <span className="page-link" onClick={() => onPageChanged(currentPage - 1)}>
                        &laquo;
                    </span>
                </li>:null}
                {pagesHtml}
                {currentPage < pages?
                <li className="page-item">
                    <a
                        className="page-link"
                        onClick={() => onPageChanged(currentPage + 1)}
                    >
                        &raquo;
                    </a>
                </li>:null}
                <li className="page-item">
                    <a
                        className="page-link"
                        onClick={() => onPageChanged(pages)}
                    >
                        Last
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
