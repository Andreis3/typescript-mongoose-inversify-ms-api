import { injectable } from 'inversify';

@injectable()
export abstract class Mapper<Input, Output> {
    abstract mapFrom(input: Input): Output;
    abstract mapTo(output: Output): Input;
}
