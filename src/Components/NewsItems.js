import React, { Component } from 'react';

const NewsItems=(props)=>{
        let {title,description,imageUrl,url,author,date,source}=props;
        return (
            <div className="my-3">
                <div className="card">
                    <img src={!imageUrl?"https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/BZA7OYQZBUI63OMYWKVWR5MENA.jpg&w=1440":imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title} <span className="badge rounded-pill bg-danger">{source}</span></h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-muted">By {author?author:"Anonymous"} on {new Date(date).toGMTString()}</small></p>
                            <a href={url} className="btn btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        );
}

export default NewsItems;
