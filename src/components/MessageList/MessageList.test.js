import {shallow} from "enzyme/build";
import MessagesList from "./MessagesList";
import React from "react";

describe('MessagesList', () => {
    test('add 3 elements', () => {
        const messages = [
            {user: "first", message: "firstMessage"},
            {user: "second", message: "secondMessage"},
            {user: "second", message: "secondMessage"}];
        const component = shallow(<MessagesList messages={messages}/>);
        expect(component.find('Message')).toHaveLength(3);

    });

    test('add empty array', () => {
        const messages = [];
        const component = shallow(<MessagesList messages={messages}/>);
        expect(component.find('Message')).toHaveLength(0);

    });
});