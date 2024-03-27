import { describe, expect, test } from 'vitest';
import { formValidator } from './validator';
import { error } from 'console';

describe('Form validation', () => {
    test('should return an error if first name is missing', () => {
        const errors = formValidator('', 'Doe', 30);
        expect(errors).toContain('First name is required');
    });

    test('should return an error if last name is missing', () => {
        const errors = formValidator('John', '', 30);
        expect(errors).toContain('Last name is required');
    });

    test('should return an error if age is negative', () => {
        const errors = formValidator('John', 'Doe', -1);
        expect(errors).toContain('Age must be a positive number');
    });

    test('should return nothing when valid data has been passed', () => {
        const errors = formValidator('John', 'Doe', 18);
        expect(errors).toHaveLength(0);
    })

    test('firstName and lastName should have more than 1 character', () => {
        const errors = formValidator('J', 'D', 18);
        expect(errors).toHaveLength(2);
    })

    test('should throw error when age is not a number', () => {
        const testFunction = () => {
            formValidator('John', 'Doe', 'age');
        };
        
        expect(testFunction).toThrow('age should be a number');

    })
});