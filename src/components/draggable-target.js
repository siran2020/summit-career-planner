//***************************************************
//   draggable-target.js    Author: Austin George
//   Receives a draggable source (field OR career)
//   Structure: Place inside entire timeline app
//***************************************************

import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import DraggableSource from './draggable-source.js';

const itemTarget = {
	drop(props, monitor, component){
		return {id: props.index};
	}
}

function collect(connect, monitor){
	return{
		connectDropTarget: connect.dropTarget(),
		hovered: monitor.isOver(),
		item: monitor.getItem(),
	}
}

class DraggableTarget extends React.Component {
	
	handleDrop = (target, type, name) => {
		if (target < 0)
		{
			return this.props.handleDrop(this.props.index + .1, type, name);
		}
		else
		{
			return this.props.handleDrop(target, type, name);
		}
	}

	render(){
		const { connectDropTarget, hovered, item } = this.props;
		const backgroundColor = hovered ? 'lightblue' : 'white';
		
		let content;

		if (this.props.career === '' && this.props.field === '')
		{
			content = <p>{this.props.prompt}</p>;
		}
		else if (this.props.career === '')
		{
			content = <DraggableSource canDrag={this.props.canDrag} type="field" item={{name: this.props.field}} handleDrop={(target, type, name) => this.handleDrop(target, type, name)}/>;
		}
		else if(this.props.field === '')
		{
			content = <DraggableSource canDrag={this.props.canDrag} type="career" item={{name: this.props.career}} handleDrop={(target, type, name) => this.handleDrop(target, type, name)}/>;
		}
		else
		{
			content = <div>
						<DraggableSource canDrag={this.props.canDrag} targetIndex = {this.props.index} type="career" item={{name: this.props.career}} handleDrop={(target, type, name) => this.handleDrop(target, type, name)}/>
						<p>in</p>
						<DraggableSource canDrag={this.props.canDrag} targetIndex = {this.props.index} type="field" item={{name: this.props.field}} handleDrop={(target, type, name) => this.handleDrop(target, type, name)}/>
					  </div>
		}

		let label;

		if (this.props.prompt == "Right now, I'm in ..." && this.props.career != '')
		{
			label = <center><p><b>You Are Here</b></p></center>
		}
		else if (this.props.prompt == "In the future, I'd like to have ..." && this.props.career == '' && this.props.field != "")
		{
			label = <center><p><i>Please enter a career</i></p></center>
		}
		else if (this.props.prompt == "In the future, I'd like to have ..." && this.props.career != '')
		{
			label = <center><p><b>Your Goal</b></p></center>
		}
		else
		{
			label = <p id="clear">.</p>
		}

		let costEarnings; 

		if (this.props.finance > 0)
		{
			costEarnings = <div className="earnings"><p>+{this.props.finance}</p></div>
		}
		else if (this.props.finance < 0)
		{
			costEarnings = <div className="cost"><p>{this.props.finance}</p></div>
		}
		else
		{
			costEarnings = <div className="zilch"></div>;
		}

		return connectDropTarget(
			<div>
				<div className = "target" style = {{ background: backgroundColor}}>
					<span>{content}</span>
				</div>
				{label}
				<center>{costEarnings}</center>
			</div>
		);
	}
}
export default DropTarget('item', itemTarget, collect)(DraggableTarget);