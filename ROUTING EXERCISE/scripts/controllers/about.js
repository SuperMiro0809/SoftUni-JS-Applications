export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };
    const data = Object.assign({}, this.app.userData);

    this.partial('./templates/about/about.hbs', data);

    console.log(this);
}