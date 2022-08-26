import React, { useState, useEffect } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
const NewsComponent = (props) => {
    NewsComponent.propTypes =
    {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number,
    }
    NewsComponent.defaultProps =
    {
        country: "us",
        category: "general",
        pageSize: 5
    }

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async () => {
        props.setProgress(20);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);

        let data = await fetch(url);
        props.setProgress(20);
        let parseData = await data.json();
        props.setProgress(50);
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        return () => {
            updateNews();
        };
    }, [])

    const fetchMoreData = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parseData = await data.json();
        setArticles(articles.concat(parseData.articles));
        setTotalResults(parseData.totalResults);

    };
    return (
        <>
            <div className="container my-3">
                <h2>Fox News | Top {props.category} Headlines</h2>
            </div>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItems source={element.source.name} author={element.author} date={element.publishedAt} title={element.title} description={element.description} url={element.url} imageUrl={element.urlToImage} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
}

export default NewsComponent;
