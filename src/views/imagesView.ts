import Image from '../models/Image';

export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `http://localhost:5000/uploads/${image.path}`,
            orphanage: image.orphanage,
        };
    },

    renderMany(images: Image[]) {
        return images.map(image => this.render(image));
    }
};