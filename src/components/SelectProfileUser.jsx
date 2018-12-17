import React from 'react';
import { Badge } from 'reactstrap';
// import Select from 'react-select';

function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) === -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
}


class App extends React.Component {
    state = {
        selectedOption: null,
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }
    render() {
        // const { selectedOption } = this.state;
        const optionProfiles = JSON.parse(window.localStorage.getItem('profile')).profiles.map(e => ({
            value: e.id,
            label: e.displayName,
        }))

        return (
            <div>
                {removeDuplicates(optionProfiles.map(e => e.label)).map((e, i) => (
                <Badge key={e.value} color="success" className="badge-perfil">
                    {e}
                </Badge>))}
            </div>
        );
    }
}

export default App;

/*
      <Select
    value={selectedOption}
    onChange={this.handleChange}
    options={optionProfiles}
/>
*/