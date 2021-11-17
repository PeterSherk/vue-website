import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
  format: combine(
    label({ label: 'Personal Website' }),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'out.log' })
  ]
});

const _logger = logger;
export { _logger as logger };
