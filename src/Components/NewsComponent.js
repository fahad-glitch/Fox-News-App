import React, { Component } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

class NewsComponent extends Component {
    static propTypes =
        {
            country: PropTypes.string,
            category: PropTypes.string,
            pageSize: PropTypes.number,
        }
    static defaultProps =
        {
            country: "us",
            category: "general",
            pageSize: 5
        }
    constructor(props) {
        super(props);
        this.state =
        {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
    }
    async updateNews() {
        this.props.setProgress(20);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        });
        
        let data = await fetch(url);
        this.props.setProgress(20);
        let parseData = await data.json();
        this.props.setProgress(50);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false,
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }
    //  handleNextClick = async () => {
    //      this.setState({
    //       page: this.state.page + 1,
    //      })
    //      this.updateNews();
    //  }

    //  handlePrevClick = async () => {
    //      this.setState({
    //          page: this.state.page - 1,
    //      })
    //      this.updateNews();

    //  }
    fetchMoreData = async () => {
       
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({page: this.state.page + 1})
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
            loading:false
        })
    };
    render() {
        return (
            <>
                <div className="container my-3">
                    <h2>Fox News | Top {this.props.category} Headlines</h2>
                </div>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItems  source={element.source.name} author={element.author} date={element.publishedAt} title={element.title} description={element.description} url={element.url} imageUrl={element.urlToImage} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} type="button" className="btn btn-dark">&larr; Previous</button>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} type="button" className="btn btn-dark">Next &rarr;</button>
                </div> */}
            </>
        );
    }
}

export default NewsComponent;
