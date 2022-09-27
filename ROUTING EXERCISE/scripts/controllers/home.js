export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };
    const data = {
        objectId: localStorage.getItem('teamId')
    }
    Object.assign(data, this.app.userData)
    this.partial('./templates/home/home.hbs', data);
}