import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addEventi } from '../store/actions/eventActions'

export class _EventiAdd extends Component {
    state = {
        eventi: {
            title: '',
            description: '',
            duration: '',
            location: '',
            tags: '',
            images: '',
            startsAt: ''

        }
    }
    componentDidMount = async () => {
        console.log('mounted');
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === ' number  ') ? parseInt(target.value) : target.value
        console.log(target.value);
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
        await this.props.addEventi(this.state.eventi);
        this.props.history.push(`/${this.state.eventi.tags}`)    }

    render() {
        const { eventi } = this.state
        return (

            <div className="edit-area margin">
                <form onSubmit={(event) => this.onSubmit(event)} className="edit-form container">
                    <h1> Add Event</h1>
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" id="title" onChange={this.handleChange}  placeholder="Title" /><br></br>
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" id="description" onChange={this.handleChange} placeholder="Description" /><br></br>
                    <label htmlFor="date">Date:</label>
                    <input type="datetime-local" name="startsAt" id="date" onChange={this.handleChange}/><br></br>
                    <label htmlFor="location">Location:</label>
                    <input type="text" name="location" id="location" onChange={this.handleChange}  placeholder="(City,Country)" /><br></br>
                    <label htmlFor="duration">Duration:</label>
                    <input type="number" name="duration" id="duration" step="0.5" min="0" max="100" onChange={this.handleChange}  placeholder="Duration(in hours)" /><br></br>
                    <label htmlFor="capacity">Capacity:</label>
                    <input type="number" name="capacity" id="capacity" step="1" min="0" max="100000" onChange={this.handleChange}  placeholder="Capacity" /><br></br>
                    <label htmlFor="tags">Choose a Tag:</label>
                    <select id="tags" name="tags" onChange={this.handleChange} >
                        <option></option>
                        <option value="Art">Art</option>
                        <option value="Sport">Sport</option>
                        <option value="Movies">Movies</option>
                        <option value="Books">Books</option>
                        <option value="TVShows">TV Shows</option>
                        <option value="Comics">Comics</option>
                    </select><br></br>
                    <label htmlFor="images">Images:</label>
                     <input type="file" name="images" id="files" onChange={this.handleChange} value={eventi.images} /><br></br> 
                    <button className="save-btn" onClick={() => { console.log('added event') }}>Save</button>
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
    addEventi
}
export const EventiAdd = connect(mapStateToProps, mapDispatchToProps)(_EventiAdd)
