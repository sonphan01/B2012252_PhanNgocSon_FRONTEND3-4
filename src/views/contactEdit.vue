
import ContactForm from '../components/ContactForm.vue';
<template>
    <div v-if='contact' class='page'>
        <h4>Hiệu chỉnh liên hệ</h4>
        <ContactForm 
            :contact='contact'
            @submit:contact='updateContact'
            @delete:contact='deleteContact'
        />
        <p>{{ message }}</p>
    </div>
</template>
<script>
    import ContactForm from '/B2012252_PhanNgocSon_FRONTEND3-4/contactbook-frontend/src/components/ContactForm.vue';
        import contactservice from '/B2012252_PhanNgocSon_FRONTEND3-4/contactbook-frontend/src/services/contact.service.js';

        export default {
            components: {
                ContactForm,
            },
            props: {
                id: {type: String, required: true},
            },
            data() {
                return {
                    contact: null,
                    message: '',
                };
            },
            methods: {
                async getContact(id) {
                    try {
                        this.contact = await contactservice.get(id);
                    } catch (error) {
                        console.log(error);
                        this.$router.push({
                            name: 'notfound',
                            params: {
                                pathMath: this.$route.path.split('/').slice(1)
                            },
                            query: this.$route.query,
                            hash: this.$route.hash,
                        });
                    }
                },

                async updateContact(data) {
                    try {
                        await contactservice.update(this.contact._id, data);
                        this.message = 'Liên hệ được cập nhật thành công.';
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
            created() {
                this.getContact(this.id);
                this.message = '';
            },
        };
</script>
