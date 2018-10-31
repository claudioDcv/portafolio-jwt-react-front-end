import React from 'react';
import { Badge } from 'reactstrap';
// import Select from 'react-select';

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
                {optionProfiles.map(e => (
                <Badge key={e.value} color="success" className="badge-perfil">
                    {e.label}
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