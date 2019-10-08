import React, { Component } from 'react'
import axios from 'axios'
import ProdutcsItem from './ProdutcsItem'

 class Home extends Component {
    state ={
        products:[],
        search: []
    }

// Ambil Barang untuk ke componentDidMount
getData = () =>{
    axios.get('http://localhost:2020/products')
        .then(res => {
            this.setState({
                products: res.data,
                search: res.data,
            })
        })
}
componentDidMount(){
    this.getData()
    
}
tampilProduk = ()=>{
    return this.state.search.map(produk =>{
        return( 
            <ProdutcsItem barang={produk} key={produk.id}/>

            )
    })
}

onBtnSearch = () => {
    let namaBarang = this.name.value.toLowerCase()
    let minimum = parseInt(this.min.value)
    let maximum = parseInt(this.max.value)

    console.log(minimum)
    const result = this.state.products.filter(produk => {
        let produkLowerName = produk.nama.toLowerCase()
        // by name
        if(isNaN(minimum) && isNaN(maximum)){
            return produkLowerName.includes(namaBarang)
        }
        //  nama minimum
        else if (isNaN(maximum) && produkLowerName){
            return produkLowerName.includes(namaBarang) &&  produk.harga >= minimum 
        }
        //  nama maximum 
        else if (isNaN(minimum) && produkLowerName){
            return produkLowerName.includes(namaBarang) &&  produk.harga <= maximum 
        }
        // by maximum dan minimum
        else if (minimum && maximum && produkLowerName){
            return produkLowerName.includes(namaBarang) && produk.harga >= minimum &&  produk.harga <= maximum

        }
        // minum saja
        else if (isNaN(maximum)){
           return produk.harga >= minimum
        }
        // maximum saja
        else if (isNaN(minimum)){
            return produk.harga <= maximum
        }
        else {
            return produk.harga >= minimum &&  produk.harga <= maximum
        }
        
        
        
    })
    this.setState({search: result})
    
}

onShowAll = () => {
    
    this.setState({search : this.state.products})
    
}

    render() {
        return (
        <div className="container-fluid ">
            <div className="row">
                {/* Search Bar */}
                <div className="col-10 col-lg-3 mt-5">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="border-bottom border-secondary card-title">Search</h1>
                            <form className="form-group mb-3" onSubmit= {e => e.preventDefault()}>
                                <h4>Name</h4>
                                <input type="text" className="form-control" ref= {input => {this.name = input}}/>

                                <h4>Price</h4>
                                <input placeholder="Minimum" type="number" className="form-control mb-2" ref={input => {this.min = input}}/>
                                <input placeholder="Maximum" type="number" className="form-control" ref= {input => {this.max = input}}/>
                            <button className="btn btn-block btn-outline-primary" onClick = {this.onBtnSearch}>Search</button>
                            <button className="btn btn-block btn-outline-warning" onClick={this.onShowAll}>Show All</button>
                            </form>
                        </div>
                    </div>
                </div>
                
                {/* List Products */}
                <div className='row col-10 col-lg-9  '>
                        {this.tampilProduk()}
                </div>
                </div>
            </div>
       

        )
    }
}

export default Home

