import React, {Component} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
// const BASE_URL = 'http://localhost:3001';

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
          first_name: '',
          last_name: '',
            email: '',
            images: [],
            imageUrls: [],
            message: ''
        }
    }

    componentDidMount () {
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)
      this.setState({
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        email: decoded.email
      })
    
    }

    selectImages = (event) => {
        let images = []
        for (var i = 0; i < event.target.files.length; i++) {
            images[i] = event.target.files.item(i);
        }
        images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
        let message = `${images.length} valid image(s) selected`
        this.setState({images, message})
    }
    uploadImages = () => {
        const uploaders = this.state.images.map(image => {
                const data = new FormData();
                data.append("image", image, image.name);
                // Make an AJAX upload request using Axios
                return axios.post('/' + 'upload', data)
                    .then(response => {
                        this.setState({
                            imageUrls: [
                                response.data.imageUrl, ...this.state.imageUrls
                            ]
                        });
                    })
            });
        // Once all the files are uploaded
        axios.all(uploaders)
           .then(() => {
                console.log('done');
            })
            .catch(err => alert(err.message));
    }
    render() {
        return (
            <div>
                <br/>
                <div className="col-sm-12">
                    <hr/>
                    <div className="col-sm-4">
                        <input
                            className="form-control "
                            type="file"
                            onChange={this.selectImages}
                            multiple/>
                    </div>
                    <p className="text-info">{this.state.message}</p>
                    <br/><br/><br/>
                    <div className="col-sm-4">
                        <button className="btn btn-primary" value="Submit" onClick={this.uploadImages}>Submit</button>
                    </div>
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><hr/><br/>
                <div className="row col-lg-12">
                    {this.state.imageUrls.map((url, i) => (
                            <div className="col-lg-2" key={i}>
                                <img src={'/' + url}
                                    className="img-rounded img-responsive"
                                    alt="not available"/><br/>
                            </div>
                        ))
}
                </div>
            </div>
        );
    }
}
export default Image;