import React from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';


function AddClothing() {
    return (
        <div className='container my-5'>
            <h2 className='mb-4'>Adicione sua roupa</h2>
            <Form>
                <FormGroup className='mb-3'>
                    <Form.Label>Adicione as imagens</Form.Label>
                    <Form.Control type='file' className='custom-border-gradient' />
                </FormGroup>
                <FormGroup className='mb-3'>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control as='select' className='custom-border-gradient'>
                        <option>Selecione uma categoria</option>
                        <option value='calca'>Calça</option>
                        <option value='camiseta'>Camiseta</option>
                        <option value='casaco'>Casaco</option>
                    </Form.Control>
                </FormGroup>
                <Button className='login-form-btn' type='submit'>
                    Adicione a categoria
                </Button>
            </Form>
        </div>
    );
}

export default AddClothing;
