import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getWebinars } from '../../actions/webinarActions';
import WebinarCard from '../webinars/WebinarCard';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getWebinars();
  }

  render() {
    const { loading } = this.props.webinars;
    const { webinars } = this.props.webinars;
    let spinner = null;
    if (webinars === null || loading) {
      spinner = <div className="loader" />;
    } else {
      spinner = null;
    }
    return (
      <React.Fragment>
        {!spinner && (
          <section id="webinarSlider">
            <div className="container">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  {webinars
                    .filter(webinar => webinar.status === 'premium')
                    .map((webinar, index) => (
                      <li
                        key={webinar._id}
                        data-target="#carouselExampleIndicators"
                        data-slide-to={index}
                        className={classnames({ active: index === 0 })}
                      />
                    ))}
                </ol>
                <div className="carousel-inner">
                  {webinars
                    .filter(webinar => webinar.status === 'premium')
                    .map((webinar, index) => (
                      <div
                        key={webinar._id}
                        className={classnames('carousel-item', {
                          active: index === 0
                        })}
                      >
                        <img
                          className="d-block w-100"
                          src={
                            webinar.cover
                              ? webinar.cover.location
                              : 'https://picsum.photos/1200/600'
                          }
                          alt={`${index} slide`}
                        />
                        <Link to={`/webinars/${webinar._id}`}>
                          <div className="premiumWebinarLink">
                            <button className="btn btn-info px-3">
                              Check it out now!
                            </button>
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </section>
        )}
        <section id="webinars">
          <div className="container">
            <div className="row my-3">
              <div className="col-12">
                <h3 className="text-center">Webinars</h3>
              </div>
            </div>
            {!spinner && (
              <React.Fragment>
                <div className="row">
                  <div className="col-12">
                    {webinars.map(webinar => (
                      <WebinarCard
                        key={webinar._id}
                        webinar={webinar}
                        onEditWebinarClick={e => {
                          this.onEditWebinar(e, webinar);
                        }}
                        dashboard={true}
                      />
                    ))}
                  </div>
                </div>
              </React.Fragment>
            )}
            {spinner}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

Landing.propTypes = {
  getWebinars: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  webinars: state.webinars
});

export default connect(
  mapStateToProps,
  { getWebinars }
)(withRouter(Landing));
