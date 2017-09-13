import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import product from './products'
console.log(product);
class Result extends Component { 
    
    render() { 
        return (
            <div className="in-stock">
            <h2><a href="">{this.props.product.name}</a></h2>
            <p>{this.props.product.price}</p>
            <p>
            {this.props.product.description}
            </p>
        </div>
        );
    }
}
class Results extends Component { 
    constructor(props) { 
        super(props);
        this.state = {
            foundProducts: props.products
        }
    }
    componentWillReceiveProps(nextProps) { 

        let foundProducts = nextProps.products.filter(product => { 
            return product.name.toLowerCase().match(nextProps.query.toLowerCase()) ||
                product.description.toLowerCase().match(nextProps.query.toLowerCase());
        });
        this.setState({
            foundProducts: foundProducts
        });
    }
    render() { 
        return (
            <div className="results">
                {this.state.foundProducts.map((product, i) => { 
                    return (
                        <Result product={product} key={i}/>
                    )
                })}
        </div>
        );
    }
}
    
class SearchBar extends Component { 
    handleQuery(event) { 
        this.props.onQuery(event.target.value)
        console.log(event.target.value);
    }
    render() { 
        return (
            <div className="search-bar">
            <input onChange={this.handleQuery.bind(this)}  placeholder="Search"/>
        </div>
        );
    }
}
class Search extends Component { 
    constructor(props) { 
        super();
        this.state = {
            query:''
        };
    }

    handleQuery(query) { 
        
        this.setState({'query': query.toLowerCase().trim()})
    }

    render() { 
        return (
            <div className="search">
                <SearchBar onQuery={this.handleQuery.bind(this)}/>
                <Results products={this.props.products} query={this.state.query}/>

            </div>
        );
    }
}

ReactDOM.render(
    <Search products={product}/>,
    document.getElementById("app")
);