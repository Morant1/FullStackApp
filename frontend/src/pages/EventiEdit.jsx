import React, { Component } from 'react'
import { connect } from 'react-redux'

import { cloudinary } from '../services/cloudinary-service'
import { eventiService } from '../services/eventiService'
import { updateEventi ,addEventi } from '../store/actions/eventiActions'


class _EventiEdit extends Component {
    state = {
        eventi: {
            title: '',
            createdBy:this.props.loggedInUser,
            description: '',
            duration: 0,
            capacity: 0,
            category: 'buisness',
            tags: '',
            imgUrl:'',
            startsAt: new Date(Date.now()).toISOString().substring(0, 16),
            participants: [],
            comments: [],
            likes : []

        }
    }
    componentDidMount = () => {
        const eventiId = this.props.match.params._id;
        if (eventiId) {
            this.loadEventi(eventiId)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params._id !== this.props.match.params._id) {
            const eventiId = this.props.match.params._id;
            if (eventiId) {
                this.loadEventi(eventiId)
            }
        }
    }

    loadEventi = async (id) => {
        const eventi = await eventiService.getById(id);
            eventi.startsAt = new Date(eventi.startsAt - (new Date().getTimezoneOffset() * 60000)).toISOString().substring(0, 16);
            this.setState({ eventi })
    }


    handleChange = async ({ target }) => {
        const field = target.name;
        let value = (target.type === 'number') ? +target.value : target.value;
        if (field === 'imgUrl') value = await cloudinary.uploadImg(target);
        // console.log(value)
      
    
        this.setState(prevState => {
            return {
                eventi: {
                    ...prevState.eventi,
                    [field]: value
                }
            }
        })
    }

    getImg = () => {
        const {category} = this.state.eventi
        const img = `https://res.cloudinary.com/coding-academy/image/upload/v1604230246/samples/general/${category}.jpg`;
        return img;
    }

    onSubmit = async (ev) => {
        ev.preventDefault()
       let eventi = {...this.state.eventi}

        
        eventi.startsAt = new Date(eventi.startsAt).getTime();
        if (!eventi.imgUrl) eventi.imgUrl = this.getImg();
        if (!Array.isArray(eventi.tags)) eventi.tags = eventi.tags.split(',');
        if (eventi._id) await this.props.updateEventi(eventi);

        else {
            eventi.createdAt = Date.now();
            await this.props.addEventi(eventi);
        }
        this.setState({eventi},()=>{console.log(this.state.eventi)}
        )
        if (eventi._id) this.props.history.push(`/${eventi.category}/${eventi._id}`);
        else this.props.history.push(`/${eventi.category}`);
    }

    render() {
        const { eventi } = this.state
        return (

            <div className="edit-container">
                <button onClick={()=>{this.props.history.goBack()}}>Go back</button>
                <form onSubmit={this.onSubmit} className="edit-form flex column">
                    <ul className="editor-list">
                        <li>
                            <label htmlFor="title">Title</label>
                            <input type="text" autoComplete="off" name="title" id="title" onChange={this.handleChange} value={eventi.title} placeholder="Think of a good title..." />
                        </li>
                        <li>
                            <label htmlFor="description">Short description</label>
                            <textarea type="text" autoComplete="off" name="description" id="description" onChange={this.handleChange} value={eventi.description} placeholder="Describe your event shortly..." />
                        </li>
                        <li>
                            <label htmlFor="date">When is it:</label>
                            <input type="datetime-local" name="startsAt" id="date" onChange={this.handleChange} value={eventi.startsAt} />
                        </li>
                        <li>
                            <label htmlFor="duration">How Long will it be?</label>
                            <input type="number" name="duration" id="duration" step="0.5" min="0" max="100" onChange={this.handleChange} value={eventi.duration} placeholder="Duration(in hours)" />
                            hrs
                        </li>
                        <li>
                            <label htmlFor="capacity">Maximum Amount of people: (choose '0' for unlimited)</label>
                            <input type="number" name="capacity" id="capacity" step="1" min="0" max="100000" onChange={this.handleChange} value={eventi.capacity} placeholder="Capacity" />
                        </li>
                        <li>
                            <label htmlFor="category">Choose a Catagory:</label>
                            <select id="category" name="category" onChange={this.handleChange} value={eventi.category}>
                                <option value="buisness">Buisness</option>
                                <option value="sports">Sports</option>
                                <option value="holywood">Holywood</option>
                                <option value="politics">Politics</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="tags">Hashtags</label>
                            <input type="text" autoComplete="off" name="tags" id="tags" onChange={this.handleChange} value={eventi.tags} placeholder="Please write with a comma separated" />
                        </li>
                        <li>
                            <label htmlFor="imgUrl">Image:</label>
                            <input type="file" name="imgUrl" id="imgUrl" onChange={this.handleChange} />
                        </li>
                        {eventi.imgUrl && <img className="img-upload" alt="pre-upload"src={eventi.imgUrl}/>}

                        <li><button className="save-btn" type="submit">Save</button></li>
                    </ul>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        eventis:state.eventiReducer.eventis,
        loggedInUser:state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
    updateEventi,
    addEventi
}
export const EventiEdit = connect(mapStateToProps, mapDispatchToProps)(_EventiEdit)
