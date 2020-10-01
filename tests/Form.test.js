import {shallow} from "enzyme/build";
import Form from "../js/Form";
import React from "react";

describe('Form', () => {
    test('runs callback with proper values', () => {
        const message = 'Message';
        const user = 'Nick';
        const handler = jest.fn();
        const component = shallow(<Form postMessage={handler}/>);
        component
            .find('input[type="text"]')
            .simulate('change', {target: {value: user}});
        component
            .find('textarea')
            .simulate('change', {target: {value: message}});
        component
            .find('input[type="submit"]')
            .simulate('click');
        expect(handler).toHaveBeenCalledWith({
            user,
            message
        });
    });
});