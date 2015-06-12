var participants = [
    {
        Name:'Serhii',
        Distance:'100',
        Time:'14,4'
    } ,{
        Name:'Natalia',
        Distance:'100',
        Time:'16,5'
    } ,{
        Name:'James',
        Distance:'60',
        Time:'6'
    } ,{
        Name:'Tom',
        Distance:'60',
        Time:'7'
    } ,{
        Name:'Din',
        Distance:'100',
        Time:'13,5'
    } ,{
        Name:'Anton',
        Distance:'1000',
        Time:'240'
    } ,{
        Name:'Marina',
        Distance:'1000',
        Time:'360'
    } ,{
        Name:'Max',
        Distance:'1000',
        Time:'160'
    } ,{
        Name:'Garry',
        Distance:'100',
        Time:'13'
    } ,{
        Name: 'Canny',
        Distance: '1000',
        Time: '86 400'
    } ,{
        Name: 'Canny',
        Distance: '100',
        Time: '9,5'
    }
];


// ----------------------------------------------------------------------------------------------
var GeneralView = React.createClass({
    // It's default parent's value
    getInitialState: function(){
        return {data:participants, Name:'', Distance:'', Time:'', FilterName: ''}
    },
            
    // there functions for changing of first and last user names
    onChangeName: function(e){
        this.setState({Name: e.target.value})
    },
    onChangeDistance: function(e){
        this.setState({Distance: e.target.value})
    },
    onChangeTime: function(e){
        this.setState({Time: e.target.value})
    },
            
    // It's will happen after clicking submit-button
    handleSubmit: function(e){
        e.preventDefault();
        this.state.data.push({Name:this.state.Name, Distance: this.state.Distance, Time:this.state.Time});
        this.setState({Name:'', Distance:'', Time:''});
    },

    // It get some property "FilterName" and change state property FilterName to newest.
    handleFilterInput: function(FilterName){
        this.setState({
            FilterName: FilterName
        });
    },

    render: function(){
        return (
            <div>
                <Input_panel data={{
                        Name: this.state.Name, 
                        Distance: this.state.Distance, 
                        Time: this.state.Time}} 
                    methods={{
                        onChangeName: this.onChangeName, 
                        onChangeDistance: this.onChangeDistance, 
                        onChangeTime: this.onChangeTime, 
                        handleSubmit: this.handleSubmit,
                }} />

                <Search_panel FilterName={this.state.FilterName} onFilterInput={this.handleFilterInput}/>
                <Table FilterName={this.state.FilterName} people={this.state.data} />                        
            </div>
        )
    }
});

// -------------------------------------------------------------------------------------------------

// For input-panel
        var Input_panel = React.createClass({
            onChangeInputName: function(e){
                this.props.methods.onChangeName(e);
            },
            onChangeInputDistance: function(e){
                this.props.methods.onChangeDistance(e);
            },
            onChangeInputTime: function(e){
                this.props.methods.onChangeTime(e);
            },

            onSubmit: function(e){
                console.log(event.target);
                this.props.methods.handleSubmit(e);
            },

            render: function(){                
                return (
                    <div className="col-sm-7 col-md-7 col-xs-12 input_panel">                        
                        <div className="ovf-a participant_card">
                            <div className="col-sm-6 col-md-6 col-xs-6">
                                <h2>Participant Card</h2>
                            </div>
                            <div className="col-sm-6 col-md-6 col-xs-6">
                                <div><span className="h4"> Name: </span><span className="card-text">{this.props.data.Name}</span></div>
                                <div><span className="h4"> Distance: </span><span className="card-text">{this.props.data.Distance}</span></div>
                                <div><span className="h4"> Time: </span><span className="card-text">{this.props.data.Time}</span></div>
                            </div>
                        </div>                        
                        <form role="form">
                          <div className="form-group col-sm-4 col-md-4 col-xs-12">
                            <label for="exampleInputEmail1">Name</label>
                            <input type="text" value={this.props.data.Name} onChange={this.onChangeInputName} className="form-control" />
                          </div>
                          <div className="form-group col-sm-4 col-md-4 col-xs-12">
                            <label for="exampleInputEmail1">Distance (m)</label>
                            <input type="text" value={this.props.data.Distance} onChange={this.onChangeInputDistance} className="form-control" />
                            </div>
                          <div className="form-group col-sm-4 col-md-4 col-xs-12">
                            <label for="exampleInputEmail1">Time (s)</label>
                            <input type="text" value={this.props.data.Time} onChange={this.onChangeInputTime} className="form-control" />
                          </div>
                          <div className="form-group col-sm-12 col-md-12 col-xs-12">
                            <div className="col-sm-6 col-md-6 col-xs-12 text-left">
                                <span className="h3">Input panel of results</span>
                            </div>
                            <div className="col-sm-6 col-md-6 col-xs-12 text-right">
                                <button onClick={this.onSubmit} className="btn btn-primary">Send data</button>
                            </div>                         
                          </div>
                        </form>
                    </div>
                )
            }
        });

// ----------------------------------------------------------------------------------------------------------------

// For search pannel
        var Search_panel = React.createClass({
            // When input will have changed. It's will be calling "onChange" methon and "onChange" method will be calling "this.hanleChange"
            // In turn "this.props.onFilterInput" will be calling "handleFilterInput" on parent and turn new value from "input".
            handleChange: function(){
                this.setState({Looking_for: this.refs.aim.getDOMNode().value});
                this.props.onFilterInput(
                    this.refs.aim.getDOMNode().value
                );
            },

            render: function(){
                return (
                    <div className="col-sm-5 col-md-5 col-xs-12 search_panel">
                        <div className="text-center h3"><span>Search panel</span></div>
                        <div className="form-group col-sm-12 col-md-12 col-xs-12">                            
                            <input ref="aim" type="text" onChange={this.handleChange} className="form-control" />
                            <div className="constainer"><span className="h3">Looking for: </span><span className="serch-text">{this.state}</span></div>
                        </div>                        
                    </div>
                )
            }
        });

// ---------------------------------------------------------------------------------------------------------------


// For table
        var Table = React.createClass({
            render: function(){
                var props = this.props;
                // people will have mapped when render happen.
                // We taking [props] from Table
                var rows = this.props.people
                .filter(function(human){
                    return human.Name.toLowerCase().indexOf(props.FilterName.toLowerCase()) > -1;
                })
                .map(function(human){
                    return <Row human={human} />
                });
                return (
                    <div className="table-responsive col-sm-12 col-md-12 col-xs-12">
                        <table className="table text-center">
                            <thead className="h3">
                                <tr className="success">
                                    <td>Name</td>
                                    <td>Distance (m)</td>
                                    <td>Time (s)</td>
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </div>
                )
            }
        });

var Row = React.createClass({
            render: function(){
                console.log(this.props.human)
                return (
                    <tr>
                        <td>{this.props.human.Name}</td>
                        <td>{this.props.human.Distance}</td>
                        <td>{this.props.human.Time}</td>
                    </tr>
                )
            }
        });

// ---------------------------------------------------------------------------------------------------------------


React.render(
    <GeneralView />,
    document.getElementById('content')
);
