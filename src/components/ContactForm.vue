<template>
    <form 
        @submit='submitContact'
        :validation-schema='contactForSchema'
    >
        <div class='form-group'>
            <label for='name'>Tên</label>
            <field
                name='name'
                type='text'
                class='form-control'
                v-model='contactLocal.name'
            />
            <errorMessage name='name' class='error-feedback'/>
        </div>

        <div class='form-group'>
            <label for='email'>Email</label>
            <field 
                name='email'
                type='email'
                class='form-control'
                v-model='contactLocal.email'   
            />
            <errorMessage name='email' class='error-feedback'/>
        </div>

        <div class='form-group'>
            <label for='address'>Địa chỉ</label>
            <field 
                name='address'
                type='text'
                class='form-control'
                v-model='contactLocal.address'
            />
            <errorMessage name='address' class='error-feedbacl'/>

            <div class='form-group'>
                <label for='phone'>Điện thoại</label>
                <field
                    name='phone'
                    type='tel'
                    class='form-control'
                    v-model='contactLocal.phone'
                    />
                <errorMessage name='phone' class='error-feedback'/>
            </div>

            <div class='form-group form-check'>
                <input 
                    name='favorite'
                    type='checkbox'
                    class='form-check-input'
                    v-model='contactLocal.favorite'
                />

                <label for='favorite' class='form-check-label'>
                    <strong>Liên hệ yêu thích</strong>
                </label>
            </div>

            <div class='form-group'>
                <button class='btn btn-primary'>Lưu</button>
                <button 
                    v-if='contactLocal._id'
                    type='button'
                    class='ml-2 btn btn-danger'
                    @click='deleteContact'>
                    Xóa
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import * as yup from 'yup';
import {form, field, errorMessage} from 'vee-validate';

export default {
    components: {
        form,
        field,
        errorMessage,
    },
    emits: ['submit:contact', 'delete:contact'],
    props: {
        contact: {type: Object, required: true},
    },
    data() {
        const contactFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            phone: yup
                .string()
                .matches(
                /((09|03|07|08|05)+([0-9]{8})\b)/g,
                "Số điện thoại không hợp lệ."
                ),
        });
        return {
            contactLocal: this.contact,
            contactFormSchema,
        };
    },
    methods: {
        submitContact() {
            this.$emit('submit:contact', this.contactLocal);
        },
        deleteContact() {
            this.$emit('delete:contact', this.contactLocal.id);
        },
    },
};
</script>

<style>
@import '/B2012252_PhanNgocSon_FRONTEND3-4/contactbook-frontend/src/assets/form.css';
</style>