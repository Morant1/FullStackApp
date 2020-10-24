import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventService } from '../services/eventService'
import { updateEvent } from '../store/actions/eventActions'


class _EventiEdit extends Component {
    state = {
        eventi: {
            title: '',
            description: '',
            duration: '',
            country: '',
            capacity: '',
            tags: '',
            images: '',
            startsAt: ''

        }
    }
    componentDidMount = async () => {
        const eventiId = this.props._id
        console.log(eventiId)
        if (eventiId) {
            const eventi = await eventService.getById(eventiId);
            eventi.startsAt = new Date(eventi.startsAt).toISOString().substring(0, 16);
            eventi.location = eventi.location.city + "," + eventi.location.country;
            this.setState({ eventi })
        }
        console.log('mounted');
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === ' number  ') ? parseInt(target.value) : target.value
        this.setState(prevState => {
            return {
                eventi: {
                    ...prevState.eventi,
                    [field]: value
                }
            }
        })

    }
    onSubmit = async (ev) => {
        ev.preventDefault()
        console.log(this.state);
        await this.props.updateEvent(this.state.eventi);
        this.props.history.push(`/${this.state.eventi.tags[0]}`);
    }

    render() {
        const { eventi } = this.state
        if (!eventi.title) return "Loading..."
        return (

            <div className="edit-area">
                <form onSubmit={(event) => this.onSubmit(event)} className="edit-form flex column">
                    <h1> Edit Event</h1>
                    <ul className="editor-list">
                        <li>
                            <label htmlFor="title">Think of a good title:</label>
                            <input type="text" name="title" id="title" onChange={this.handleChange} value={eventi.title} placeholder="Title" />
                        </li>
                        <li>
                            <label htmlFor="date">When is it:</label>
                            <input type="datetime-local" name="startsAt" id="date" onChange={this.handleChange} value={eventi.startsAt} />
                        </li>
                        <li>
                            <label htmlFor="location">Where are you?</label>
                            <input type="text" name="location" id="location" onChange={this.handleChange} value={eventi.location} placeholder="(City,Country)" />
                        </li>
                        <li>
                            <label htmlFor="duration">How Long will this be?</label>
                            <input type="number" name="duration" id="duration" step="0.5" min="0" max="100" onChange={this.handleChange} value={eventi.duration} placeholder="Duration(in hours)" />
                            Hours
                        </li>
                        <li>
                            <label htmlFor="capacity">Maximum Amount of people:</label>
                            <input type="number" name="capacity" id="capacity" step="1" min="0" max="100000" onChange={this.handleChange} value={eventi.capacity} placeholder="Capacity" />
                        </li>
                        <li>
                            <label htmlFor="tags">Choose a Catagory:</label>
                            <select id="tags" name="tags" onChange={this.handleChange} value={eventi.tags}>
                                <option value="Art">Art</option>
                                <option value="Sport">Sport</option>
                                <option value="Movies">Movies</option>
                                <option value="Books">Books</option>
                                <option value="TVShows">TV Shows</option>
                                <option value="Comics">Comics</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="images">Image:</label>
                            <input type="file" name="images" id="files" onChange={this.handleChange} value={eventi.images} />
                        </li>
                        <li>
                            <label htmlFor="description">Short Description</label>
                            <textarea type="text" name="description" id="description" onChange={this.handleChange} value={eventi.description} placeholder="Description" />
                        </li>

                        <li><button className="save-btn" onClick={() => { console.log('added event') }}>Save</button></li>
                    </ul>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        events: state.eventReducer.events
    }
}

const mapDispatchToProps = {
    updateEvent
}
export const EventiEdit = connect(mapStateToProps, mapDispatchToProps)(_EventiEdit)
