import React, { Component } from 'react'
import { connect } from 'react-redux'

import { InputLabel, FormControl, MenuItem, Select, TextField, Button } from '@material-ui/core';


import { cloudinary } from '../services/cloudinary-service'
import { BusService } from '../services/event-bus-service'
import { updateEventi, addEventi } from '../store/actions/eventiActions'
import { eventiService } from '../services/eventiService';


class _EventiEdit extends Component {
    state = {
        eventi: {
            title: '',
            createdBy: this.props.loggedInUser,
            description: '',
            duration: 0,
            capacity: 0,
            category: 'buisness',
            tags: '',
            imgUrl: '',
            startsAt: new Date(Date.now()).toISOString().substring(0, 16),
            participants: [],
            comments: [],
            likes: []

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
        const { category } = this.state.eventi
        const img = `https://res.cloudinary.com/coding-academy/image/upload/v1604230246/samples/general/${category}.jpg`;
        return img;
    }

    onSubmit = async (ev) => {
        ev.preventDefault()
        let eventi = { ...this.state.eventi }


        eventi.startsAt = new Date(eventi.startsAt).getTime();
        if (!eventi.imgUrl) eventi.imgUrl = this.getImg();
        if (!Array.isArray(eventi.tags)) eventi.tags = eventi.tags.split(',');
        if (eventi._id) {
            await this.props.updateEventi(eventi);
            BusService.emit('notify', { msg: `You edited ${eventi.createdBy.username}'s event details` })

        } else {
            eventi.createdAt = Date.now();
            await this.props.addEventi(eventi);
            BusService.emit('notify', { msg: `You added your own event, named ${eventi.title}` })
        }
        this.setState({ eventi })

        if (eventi._id) this.props.history.push(`/${eventi.category}/${eventi._id}`);
        else this.props.history.push(`/${eventi.category}`);
    }

    render() {
        const { eventi } = this.state
        return (

            <div className="edit-container" style={{ backgroundImage: `url(${require('../assets/img/ana.jpg')})` }}>
                <form onSubmit={this.onSubmit} className="edit-form">
                    <div onClick={() => { this.props.history.goBack() }}><i className="back fas fa-arrow-circle-left"></i></div>
                    <div className="input-left">
                        <FormControl>
                            <InputLabel htmlFor="category">Choose a Catagory:</InputLabel>
                            <Select id="category" name="category" onChange={this.handleChange} value={eventi.category}>
                                <MenuItem value="buisness">Buisness</MenuItem>
                                <MenuItem value="sports">Sports</MenuItem>
                                <MenuItem value="holywood">Holywood</MenuItem>
                                <MenuItem value="politics">Politics</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField label="Title" type="text" autoComplete="off" name="title" onChange={this.handleChange} value={eventi.title} placeholder="Think of a good title" />
                        <TextField label="Tags" type="text" autoComplete="off" name="tags" id="tags" onChange={this.handleChange} value={eventi.tags} placeholder="comma separated" />
                        <TextField label="Description" multiline rows={8} variant="outlined" type="text" autoComplete="off" name="description" id="description" onChange={this.handleChange} value={eventi.description} placeholder="Describe your event shortly..." />
                    </div>
                    <div className="input-right">
                        <TextField label="When is it" InputLabelProps={{
                            shrink: true,
                        }} type="datetime-local" name="startsAt" id="date" onChange={this.handleChange} value={eventi.startsAt} />
                        <TextField label="How long will it be (in hours)" type="number" name="duration" id="duration" step="0.5" min="0" max="100" onChange={this.handleChange} value={eventi.duration} placeholder="Duration(in hours)" />

                        <TextField label="Maximum participants (0 - unlimited)" type="number" name="capacity" id="capacity" step="1" min="0" max="100000" onChange={this.handleChange} value={eventi.capacity} placeholder="Capacity" />



                        <InputLabel htmlFor="file-upload" className="custom-file-upload"><i className="fas fa-upload"></i>Upload Image</InputLabel>
                        <input type="file" style={{ display: 'none' }} name="imgUrl" id="file-upload" onChange={this.handleChange} />

                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className="save-btn"
                            type="submit"
                        >
                            <i className="fas fa-save"></i> Save</Button>
                        <div className="img-upload-container">
                            {eventi.imgUrl && <img className="img-upload" alt="pre-upload" src={eventi.imgUrl} />}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        eventis: state.eventiReducer.eventis,
        loggedInUser: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
    updateEventi,
    addEventi
}
export const EventiEdit = connect(mapStateToProps, mapDispatchToProps)(_EventiEdit)
